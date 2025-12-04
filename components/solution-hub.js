/**
 * Self-Serve Solution Hub
 * Interactive filtering and search functionality
 * Accessibility-first, keyboard navigable
 */

(function() {
    'use strict';

    // ============================================
    // State Management
    // ============================================
    const state = {
        currentCategory: 'all',
        searchQuery: '',
        allCards: [],
        visibleCards: [],
        userBehavior: {
            searchAttempts: 0,
            filterClicks: 0,
            explorationScore: 0.6 // 60% capturing by default
        }
    };

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        searchInput: document.getElementById('solution-search'),
        searchClear: document.querySelector('.search-clear'),
        filterButtons: document.querySelectorAll('.filter-pill'),
        solutionCards: document.querySelectorAll('.solution-card'),
        solutionsGrid: document.querySelector('.solutions-grid'),
        emptyState: document.querySelector('.empty-state'),
        resultsCount: document.getElementById('results-count'),
        countNumber: document.querySelector('.count-number'),
        resetButton: document.getElementById('reset-filters')
    };

    // ============================================
    // Initialize
    // ============================================
    function init() {
        // Store all cards for filtering
        state.allCards = Array.from(elements.solutionCards);

        // Set up event listeners
        setupSearchListeners();
        setupFilterListeners();
        setupKeyboardNavigation();
        setupBehaviorTracking();

        // Initial count
        updateResultsCount();

        console.log('Solution Hub initialized');
    }

    // ============================================
    // Search Functionality
    // ============================================
    function setupSearchListeners() {
        // Real-time search
        elements.searchInput.addEventListener('input', debounce(handleSearch, 300));

        // Show/hide clear button
        elements.searchInput.addEventListener('input', function() {
            elements.searchClear.hidden = this.value.length === 0;
        });

        // Clear search
        elements.searchClear.addEventListener('click', function() {
            elements.searchInput.value = '';
            elements.searchClear.hidden = true;
            state.searchQuery = '';
            filterSolutions();
            elements.searchInput.focus();
        });

        // Handle Enter key in search
        elements.searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch.call(this);
            }
        });
    }

    function handleSearch() {
        state.searchQuery = this.value.toLowerCase().trim();
        state.userBehavior.searchAttempts++;

        // Adjust behavior score: more searches = more intent (pushing)
        adjustBehaviorScore('search');

        filterSolutions();
    }

    // ============================================
    // Filter Functionality
    // ============================================
    function setupFilterListeners() {
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });

        // Reset button in empty state
        if (elements.resetButton) {
            elements.resetButton.addEventListener('click', resetFilters);
        }
    }

    function handleFilterClick(e) {
        const category = e.currentTarget.dataset.category;

        state.userBehavior.filterClicks++;

        // Adjust behavior score: filters = exploration (capturing)
        adjustBehaviorScore('filter');

        // Update active state
        elements.filterButtons.forEach(btn => {
            const isActive = btn.dataset.category === category;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        state.currentCategory = category;
        filterSolutions();
    }

    function resetFilters() {
        // Reset to "All Solutions"
        elements.filterButtons.forEach(btn => {
            const isAll = btn.dataset.category === 'all';
            btn.classList.toggle('active', isAll);
            btn.setAttribute('aria-pressed', isAll);
        });

        state.currentCategory = 'all';
        elements.searchInput.value = '';
        state.searchQuery = '';
        elements.searchClear.hidden = true;

        filterSolutions();
        elements.searchInput.focus();
    }

    // ============================================
    // Dual Inclusion Behavior Tracking
    // ============================================
    function adjustBehaviorScore(action) {
        const scores = state.userBehavior;

        if (action === 'search') {
            // Search indicates intent - shift toward pushing (40%)
            scores.explorationScore = Math.max(0.4, scores.explorationScore - 0.05);
        } else if (action === 'filter') {
            // Filtering indicates exploration - shift toward capturing (60%)
            scores.explorationScore = Math.min(0.6, scores.explorationScore + 0.03);
        }

        // Log behavior for analytics (in production, send to analytics service)
        console.log('User behavior:', {
            mode: scores.explorationScore > 0.5 ? 'Exploring (Capturing)' : 'Searching (Pushing)',
            explorationScore: scores.explorationScore.toFixed(2),
            searchAttempts: scores.searchAttempts,
            filterClicks: scores.filterClicks
        });

        // In a real implementation, this could adjust:
        // - Search result ranking
        // - Suggested content visibility
        // - Related resources prominence
    }

    function setupBehaviorTracking() {
        // Track card interactions
        state.allCards.forEach(card => {
            const link = card.querySelector('.card-link');
            if (link) {
                link.addEventListener('click', function() {
                    // Track which type of content users engage with
                    const category = card.dataset.category;
                    console.log('Card clicked:', {
                        category,
                        currentMode: state.userBehavior.explorationScore > 0.5 ? 'exploring' : 'searching'
                    });
                });
            }
        });
    }

    // ============================================
    // Filter Solutions Logic
    // ============================================
    function filterSolutions() {
        let visibleCount = 0;

        state.allCards.forEach(card => {
            const matchesCategory = state.currentCategory === 'all' ||
                                   card.dataset.category === state.currentCategory;

            const matchesSearch = state.searchQuery === '' ||
                                 cardMatchesSearch(card, state.searchQuery);

            const isVisible = matchesCategory && matchesSearch;

            // Use hidden attribute for better accessibility
            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
                state.visibleCards.push(card);
            }
        });

        // Update UI
        updateResultsCount(visibleCount);
        toggleEmptyState(visibleCount === 0);

        // Announce results to screen readers
        announceResults(visibleCount);
    }

    function cardMatchesSearch(card, query) {
        // Search in title
        const titleLink = card.querySelector('.card-title .card-link');
        const title = titleLink ? titleLink.textContent.toLowerCase() : '';

        // Search in description
        const description = card.querySelector('.card-description');
        const descText = description ? description.textContent.toLowerCase() : '';

        // Search in category
        const category = card.querySelector('.card-category');
        const catText = category ? category.textContent.toLowerCase() : '';

        return title.includes(query) ||
               descText.includes(query) ||
               catText.includes(query);
    }

    // ============================================
    // UI Updates
    // ============================================
    function updateResultsCount(count) {
        const total = count !== undefined ? count : state.allCards.length;
        elements.countNumber.textContent = total;

        // Update grammar
        const solutionText = total === 1 ? 'solution' : 'solutions';
        elements.resultsCount.innerHTML = `Showing <span class="count-number">${total}</span> ${solutionText}`;
    }

    function toggleEmptyState(show) {
        elements.solutionsGrid.hidden = show;
        elements.emptyState.hidden = !show;
    }

    function announceResults(count) {
        // Update the live region for screen readers
        const message = count === 0
            ? 'No solutions found. Try adjusting your search or filters.'
            : `${count} ${count === 1 ? 'solution' : 'solutions'} found`;

        // Update the aria-live region
        elements.resultsCount.setAttribute('aria-label', message);
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    function setupKeyboardNavigation() {
        // Arrow key navigation for filter pills
        const filterContainer = document.querySelector('.filter-controls');

        filterContainer.addEventListener('keydown', function(e) {
            const current = document.activeElement;

            if (!current.classList.contains('filter-pill')) return;

            const pills = Array.from(elements.filterButtons);
            const currentIndex = pills.indexOf(current);

            let nextIndex;

            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = (currentIndex + 1) % pills.length;
                    pills[nextIndex].focus();
                    break;

                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = currentIndex - 1;
                    if (nextIndex < 0) nextIndex = pills.length - 1;
                    pills[nextIndex].focus();
                    break;

                case 'Home':
                    e.preventDefault();
                    pills[0].focus();
                    break;

                case 'End':
                    e.preventDefault();
                    pills[pills.length - 1].focus();
                    break;
            }
        });

        // Escape key clears search
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && elements.searchInput.value) {
                elements.searchClear.click();
            }
        });
    }

    // ============================================
    // Utility Functions
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ============================================
    // Advanced Features (for production)
    // ============================================

    /**
     * Search suggestions based on user behavior
     * In production, this would show suggested searches based on:
     * - Popular searches
     * - User's previous searches
     * - Current behavior mode (exploring vs. searching)
     */
    function getSearchSuggestions(query) {
        const suggestions = {
            exploring: [
                'breathing exercises',
                'sleep tips',
                'managing stress',
                'mindfulness practices'
            ],
            searching: [
                'anxiety relief',
                'crisis support',
                'therapist connection',
                'immediate help'
            ]
        };

        const mode = state.userBehavior.explorationScore > 0.5 ? 'exploring' : 'searching';
        return suggestions[mode].filter(s => s.includes(query.toLowerCase()));
    }

    /**
     * Analytics event tracking
     * In production, this would send events to analytics service
     */
    function trackEvent(category, action, label, value) {
        // Example: Google Analytics, Mixpanel, etc.
        console.log('Analytics Event:', { category, action, label, value });

        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         'event_category': category,
        //         'event_label': label,
        //         'value': value
        //     });
        // }
    }

    /**
     * Personalization based on user behavior
     * In production, this could:
     * - Reorder results based on user preferences
     * - Highlight recommended content
     * - Adjust card prominence
     */
    function personalizeResults() {
        const mode = state.userBehavior.explorationScore > 0.5 ? 'exploring' : 'searching';

        // Different strategies based on user behavior
        if (mode === 'exploring') {
            // Show diverse categories, encourage discovery
            // Could add "You might also like..." sections
        } else {
            // Prioritize direct solutions, quick access
            // Could emphasize quick shortcuts and immediate help
        }
    }

    // ============================================
    // Initialize on DOM ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // Expose API for testing (optional)
    // ============================================
    window.SolutionHub = {
        state,
        resetFilters,
        filterSolutions,
        getSearchSuggestions
    };

})();
