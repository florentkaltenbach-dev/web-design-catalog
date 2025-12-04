/**
 * Catalog Navigation & Filtering
 * Client-side pattern filtering with URL state management
 * Progressive enhancement - works without JS (shows all patterns)
 */

(function() {
  'use strict';

  // State management
  const state = {
    filters: {
      useCase: 'all',
      emotional: 'all'
    },
    searchQuery: '',
    allPatterns: [],
    visiblePatterns: [],
    catalog: null,
    initialized: false
  };

  // DOM Elements (cached after init)
  let elements = {};

  /**
   * Initialize the catalog navigation
   */
  async function init() {
    try {
      // Load catalog data
      const response = await fetch('catalog/catalog.json');
      if (!response.ok) throw new Error('Failed to load catalog');

      state.catalog = await response.json();
      state.allPatterns = state.catalog.entries;
      state.visiblePatterns = [...state.allPatterns];

      // Cache DOM elements
      cacheElements();

      // Build filter UI from taxonomy
      buildFilterUI();

      // Attach event listeners
      attachEventListeners();

      // Read URL state and apply filters
      readURLState();

      // Mark as initialized
      state.initialized = true;
      document.documentElement.classList.add('js-catalog-enhanced');

    } catch (error) {
      console.error('Catalog navigation init failed:', error);
      // Fallback: all patterns visible (static HTML)
    }
  }

  /**
   * Cache DOM element references
   */
  function cacheElements() {
    elements = {
      searchInput: document.getElementById('pattern-search'),
      searchClear: document.getElementById('search-clear'),
      useCaseFilters: document.getElementById('use-case-filters'),
      emotionalFilters: document.getElementById('emotional-filters'),
      resultsCount: document.getElementById('results-count'),
      resultsNumber: document.querySelector('.results-count__number'),
      catalogGrid: document.getElementById('catalog-grid'),
      emptyState: document.getElementById('empty-state'),
      resetButton: document.getElementById('reset-filters')
    };
  }

  /**
   * Build filter UI from catalog taxonomy
   */
  function buildFilterUI() {
    if (!state.catalog.taxonomy || !elements.useCaseFilters) return;

    const useCases = state.catalog.taxonomy.use_cases;

    // Build use case filter pills
    let useCaseHTML = `
      <button class="filter-pill"
              data-filter="useCase"
              data-value="all"
              aria-pressed="true">
        All Patterns
      </button>
    `;

    useCases.forEach(useCase => {
      useCaseHTML += `
        <button class="filter-pill"
                data-filter="useCase"
                data-value="${useCase.id}"
                aria-pressed="false">
          <span class="filter-pill__icon">${useCase.icon}</span>
          ${useCase.label}
        </button>
      `;
    });

    elements.useCaseFilters.innerHTML = useCaseHTML;

    // Build emotional filters if container exists
    if (elements.emotionalFilters && state.catalog.taxonomy.emotional_filters) {
      let emotionalHTML = `
        <button class="filter-pill"
                data-filter="emotional"
                data-value="all"
                aria-pressed="true">
          All
        </button>
      `;

      state.catalog.taxonomy.emotional_filters.forEach(filter => {
        emotionalHTML += `
          <button class="filter-pill"
                  data-filter="emotional"
                  data-value="${filter.id}"
                  aria-pressed="false">
            ${filter.label}
          </button>
        `;
      });

      elements.emotionalFilters.innerHTML = emotionalHTML;
    }
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
      elements.searchInput.addEventListener('keydown', handleSearchKeydown);
    }

    // Search clear button
    if (elements.searchClear) {
      elements.searchClear.addEventListener('click', clearSearch);
    }

    // Filter pills (use event delegation)
    document.addEventListener('click', handleFilterClick);

    // Reset button
    if (elements.resetButton) {
      elements.resetButton.addEventListener('click', resetFilters);
    }

    // Handle browser back/forward
    window.addEventListener('popstate', readURLState);
  }

  /**
   * Handle search input
   */
  function handleSearch(event) {
    state.searchQuery = event.target.value.trim().toLowerCase();
    updateSearchClearVisibility();
    filterPatterns();
    updateURL();
  }

  /**
   * Handle search keyboard events
   */
  function handleSearchKeydown(event) {
    if (event.key === 'Escape') {
      clearSearch();
    }
  }

  /**
   * Clear search input
   */
  function clearSearch() {
    if (elements.searchInput) {
      elements.searchInput.value = '';
      state.searchQuery = '';
      updateSearchClearVisibility();
      filterPatterns();
      updateURL();
      elements.searchInput.focus();
    }
  }

  /**
   * Update search clear button visibility
   */
  function updateSearchClearVisibility() {
    if (elements.searchClear) {
      elements.searchClear.hidden = state.searchQuery === '';
    }
  }

  /**
   * Handle filter pill clicks
   */
  function handleFilterClick(event) {
    const pill = event.target.closest('.filter-pill');
    if (!pill) return;

    const filterType = pill.dataset.filter;
    const filterValue = pill.dataset.value;

    if (!filterType || filterValue === undefined) return;

    // Update state
    state.filters[filterType] = filterValue;

    // Update UI
    updateFilterPillStates(filterType, filterValue);

    // Apply filters
    filterPatterns();
    updateURL();
  }

  /**
   * Update filter pill aria-pressed states
   */
  function updateFilterPillStates(filterType, activeValue) {
    const pills = document.querySelectorAll(`[data-filter="${filterType}"]`);
    pills.forEach(pill => {
      const isActive = pill.dataset.value === activeValue;
      pill.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  /**
   * Filter patterns based on current state
   */
  function filterPatterns() {
    const { filters, searchQuery, allPatterns } = state;

    state.visiblePatterns = allPatterns.filter(pattern => {
      // Use case filter
      const matchesUseCase = filters.useCase === 'all' ||
        (pattern.use_cases && pattern.use_cases.includes(filters.useCase));

      // Emotional filter
      let matchesEmotional = filters.emotional === 'all';
      if (!matchesEmotional && pattern.dual_inclusion) {
        const capturingRatio = pattern.dual_inclusion.capturing_ratio || 50;
        const emotionalFilter = state.catalog.taxonomy.emotional_filters.find(
          f => f.id === filters.emotional
        );
        if (emotionalFilter) {
          const minOk = !emotionalFilter.min_capturing || capturingRatio >= emotionalFilter.min_capturing;
          const maxOk = !emotionalFilter.max_capturing || capturingRatio <= emotionalFilter.max_capturing;
          matchesEmotional = minOk && maxOk;
        }
      }

      // Search filter
      const matchesSearch = searchQuery === '' || patternMatchesSearch(pattern, searchQuery);

      return matchesUseCase && matchesEmotional && matchesSearch;
    });

    updateDOM();
  }

  /**
   * Check if pattern matches search query
   */
  function patternMatchesSearch(pattern, query) {
    const searchable = [
      pattern.name || '',
      pattern.emotional_axis || '',
      pattern.best_for || '',
      (pattern.tags || []).join(' '),
      (pattern.search_keywords || []).join(' '),
      (pattern.audience || []).join(' ')
    ].join(' ').toLowerCase();

    return searchable.includes(query);
  }

  /**
   * Update DOM to reflect filtered patterns
   */
  function updateDOM() {
    const cards = document.querySelectorAll('.catalog-card');
    const visibleIds = state.visiblePatterns.map(p => p.id);

    cards.forEach(card => {
      // Extract pattern ID from card
      const patternId = parseInt(card.dataset.patternId || card.id?.replace('pattern-', ''), 10);
      const isVisible = visibleIds.includes(patternId);

      card.hidden = !isVisible;
      card.classList.toggle('catalog-card--filtered-out', !isVisible);
    });

    // Update results count
    updateResultsCount();

    // Show/hide empty state
    toggleEmptyState();
  }

  /**
   * Update results count display
   */
  function updateResultsCount() {
    if (elements.resultsNumber) {
      elements.resultsNumber.textContent = state.visiblePatterns.length;
    }

    // Announce to screen readers
    if (elements.resultsCount) {
      elements.resultsCount.setAttribute('aria-live', 'polite');
    }
  }

  /**
   * Show or hide empty state
   */
  function toggleEmptyState() {
    const isEmpty = state.visiblePatterns.length === 0;

    if (elements.emptyState) {
      elements.emptyState.hidden = !isEmpty;
    }

    if (elements.catalogGrid) {
      elements.catalogGrid.classList.toggle('catalog-grid--empty', isEmpty);
    }
  }

  /**
   * Reset all filters to default
   */
  function resetFilters() {
    // Reset state
    state.filters.useCase = 'all';
    state.filters.emotional = 'all';
    state.searchQuery = '';

    // Reset UI
    if (elements.searchInput) {
      elements.searchInput.value = '';
    }
    updateSearchClearVisibility();

    // Reset all filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      const isAll = pill.dataset.value === 'all';
      pill.setAttribute('aria-pressed', isAll ? 'true' : 'false');
    });

    // Apply filters
    filterPatterns();
    updateURL();
  }

  /**
   * Update URL with current filter state
   */
  function updateURL() {
    const params = new URLSearchParams();

    if (state.filters.useCase !== 'all') {
      params.set('use_case', state.filters.useCase);
    }
    if (state.filters.emotional !== 'all') {
      params.set('emotional', state.filters.emotional);
    }
    if (state.searchQuery) {
      params.set('q', state.searchQuery);
    }

    const newURL = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname;

    window.history.replaceState({ filters: state.filters }, '', newURL);
  }

  /**
   * Read filter state from URL
   */
  function readURLState() {
    const params = new URLSearchParams(window.location.search);

    // Read use case filter
    if (params.has('use_case')) {
      state.filters.useCase = params.get('use_case');
      updateFilterPillStates('useCase', state.filters.useCase);
    }

    // Read emotional filter
    if (params.has('emotional')) {
      state.filters.emotional = params.get('emotional');
      updateFilterPillStates('emotional', state.filters.emotional);
    }

    // Read search query
    if (params.has('q')) {
      state.searchQuery = params.get('q').toLowerCase();
      if (elements.searchInput) {
        elements.searchInput.value = params.get('q');
      }
      updateSearchClearVisibility();
    }

    // Apply filters
    filterPatterns();
  }

  /**
   * Debounce utility function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging (optional)
  window.catalogNavigation = {
    getState: () => ({ ...state }),
    resetFilters
  };

})();
