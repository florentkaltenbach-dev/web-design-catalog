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
        emptyStateMessage: document.getElementById('empty-state-message'),
        resultsCount: document.getElementById('results-count'),
        countNumber: document.querySelector('.count-number'),
        resetButton: document.getElementById('reset-filters'),
        btnViewAll: document.getElementById('btn-view-all'),
        btnClearSearch: document.getElementById('btn-clear-search')
    };

    // ============================================
    // Safe DOM Query Helper
    // ============================================
    function safeQuerySelector(selector, context = document) {
        try {
            const el = context.querySelector(selector);
            if (!el) {
                console.warn(`Element not found: ${selector}`);
            }
            return el;
        } catch (error) {
            console.error(`Error querying selector "${selector}":`, error);
            return null;
        }
    }

    // ============================================
    // Error Display
    // ============================================
    function showInitError() {
        const container = document.querySelector('.solution-hub');
        if (container) {
            const msg = document.createElement('div');
            msg.className = 'init-error';
            msg.setAttribute('role', 'alert');
            msg.style.cssText = 'padding: 1rem; margin: 1rem 0; background: #fee; border-left: 4px solid #c00; color: #c00;';
            msg.textContent = 'Unable to load Solution Hub. Please refresh the page.';
            container.prepend(msg);
        }
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        try {
            // Validate required elements
            if (!elements.searchInput || !elements.solutionsGrid) {
                console.warn('Solution Hub: Required elements missing');
                showInitError();
                return;
            }

            // Store all cards for filtering
            state.allCards = Array.from(elements.solutionCards);

            if (state.allCards.length === 0) {
                console.warn('Solution Hub: No solution cards found');
            }

            // Set up event listeners
            setupSearchListeners();
            setupFilterListeners();
            setupKeyboardNavigation();
            setupBehaviorTracking();

            // Initial count
            updateResultsCount();

            console.log('Solution Hub initialized');
        } catch (error) {
            console.error('Solution Hub initialization failed:', error);
            showInitError();
        }
    }

    // ============================================
    // Search Functionality
    // ============================================
    function setupSearchListeners() {
        try {
            if (!elements.searchInput) {
                console.warn('Search input not found, skipping search setup');
                return;
            }

            // Real-time search
            elements.searchInput.addEventListener('input', debounce(handleSearch, 300));

            // Show/hide clear button
            elements.searchInput.addEventListener('input', function() {
                if (elements.searchClear) {
                    elements.searchClear.hidden = this.value.length === 0;
                }
            });

            // Clear search
            if (elements.searchClear) {
                elements.searchClear.addEventListener('click', function() {
                    if (elements.searchInput) {
                        elements.searchInput.value = '';
                        elements.searchClear.hidden = true;
                        state.searchQuery = '';
                        filterSolutions();
                        elements.searchInput.focus();
                    }
                });
            }

            // Handle Enter key in search
            elements.searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch.call(this);
                }
            });
        } catch (error) {
            console.error('Error setting up search listeners:', error);
        }
    }

    function handleSearch() {
        try {
            if (!this || !this.value) {
                console.warn('Invalid search input');
                return;
            }

            state.searchQuery = this.value.toLowerCase().trim();
            state.userBehavior.searchAttempts++;

            // Adjust behavior score: more searches = more intent (pushing)
            adjustBehaviorScore('search');

            filterSolutions();
        } catch (error) {
            console.error('Error handling search:', error);
        }
    }

    // ============================================
    // Filter Functionality
    // ============================================
    function setupFilterListeners() {
        try {
            if (elements.filterButtons && elements.filterButtons.length > 0) {
                elements.filterButtons.forEach(button => {
                    if (button) {
                        button.addEventListener('click', handleFilterClick);
                    }
                });
            } else {
                console.warn('No filter buttons found');
            }

            // Reset button in empty state
            if (elements.resetButton) {
                elements.resetButton.addEventListener('click', resetFilters);
            }

            // New empty state action buttons
            if (elements.btnViewAll) {
                elements.btnViewAll.addEventListener('click', resetFilters);
            }

            if (elements.btnClearSearch) {
                elements.btnClearSearch.addEventListener('click', clearSearch);
            }
        } catch (error) {
            console.error('Error setting up filter listeners:', error);
        }
    }

    function clearSearch() {
        try {
            if (elements.searchInput) {
                elements.searchInput.value = '';
                state.searchQuery = '';

                if (elements.searchClear) {
                    elements.searchClear.hidden = true;
                }

                filterSolutions();
                elements.searchInput.focus();
            }
        } catch (error) {
            console.error('Error clearing search:', error);
        }
    }

    function handleFilterClick(e) {
        try {
            if (!e || !e.currentTarget || !e.currentTarget.dataset) {
                console.warn('Invalid filter click event');
                return;
            }

            const category = e.currentTarget.dataset.category;
            if (!category) {
                console.warn('Filter button missing category data');
                return;
            }

            state.userBehavior.filterClicks++;

            // Adjust behavior score: filters = exploration (capturing)
            adjustBehaviorScore('filter');

            // Update active state
            if (elements.filterButtons && elements.filterButtons.length > 0) {
                elements.filterButtons.forEach(btn => {
                    if (btn && btn.dataset) {
                        const isActive = btn.dataset.category === category;
                        btn.classList.toggle('active', isActive);
                        btn.setAttribute('aria-pressed', isActive);
                    }
                });
            }

            state.currentCategory = category;
            filterSolutions();
        } catch (error) {
            console.error('Error handling filter click:', error);
        }
    }

    function resetFilters() {
        try {
            // Reset to "All Solutions"
            if (elements.filterButtons && elements.filterButtons.length > 0) {
                elements.filterButtons.forEach(btn => {
                    if (btn && btn.dataset) {
                        const isAll = btn.dataset.category === 'all';
                        btn.classList.toggle('active', isAll);
                        btn.setAttribute('aria-pressed', isAll);
                    }
                });
            }

            state.currentCategory = 'all';

            if (elements.searchInput) {
                elements.searchInput.value = '';
                state.searchQuery = '';
            }

            if (elements.searchClear) {
                elements.searchClear.hidden = true;
            }

            filterSolutions();

            if (elements.searchInput) {
                elements.searchInput.focus();
            }
        } catch (error) {
            console.error('Error resetting filters:', error);
        }
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
        try {
            if (!state.allCards || state.allCards.length === 0) {
                console.warn('No cards available for behavior tracking');
                return;
            }

            // Track card interactions
            state.allCards.forEach(card => {
                if (!card) return;

                const link = card.querySelector('.card-link');
                if (link) {
                    link.addEventListener('click', function() {
                        try {
                            // Track which type of content users engage with
                            const category = card.dataset ? card.dataset.category : null;
                            console.log('Card clicked:', {
                                category,
                                currentMode: state.userBehavior.explorationScore > 0.5 ? 'exploring' : 'searching'
                            });
                        } catch (error) {
                            console.error('Error tracking card click:', error);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error setting up behavior tracking:', error);
        }
    }

    // ============================================
    // Filter Solutions Logic
    // ============================================
    function filterSolutions() {
        try {
            if (!state.allCards || state.allCards.length === 0) {
                console.warn('No cards to filter');
                return;
            }

            let visibleCount = 0;
            state.visibleCards = []; // Clear visible cards array

            state.allCards.forEach(card => {
                if (!card) return;

                const matchesCategory = state.currentCategory === 'all' ||
                                       (card.dataset && card.dataset.category === state.currentCategory);

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
        } catch (error) {
            console.error('Error filtering solutions:', error);
        }
    }

    function cardMatchesSearch(card, query) {
        try {
            if (!card || !query) {
                return false;
            }

            // Search in title
            const titleLink = card.querySelector('.card-title .card-link');
            const title = titleLink && titleLink.textContent ? titleLink.textContent.toLowerCase() : '';

            // Search in description
            const description = card.querySelector('.card-description');
            const descText = description && description.textContent ? description.textContent.toLowerCase() : '';

            // Search in category
            const category = card.querySelector('.card-category');
            const catText = category && category.textContent ? category.textContent.toLowerCase() : '';

            return title.includes(query) ||
                   descText.includes(query) ||
                   catText.includes(query);
        } catch (error) {
            console.error('Error matching card to search:', error);
            return false;
        }
    }

    // ============================================
    // UI Updates
    // ============================================
    function updateResultsCount(count) {
        try {
            const total = count !== undefined ? count : (state.allCards ? state.allCards.length : 0);

            if (elements.countNumber) {
                elements.countNumber.textContent = total;
            }

            // Update grammar
            if (elements.resultsCount) {
                const solutionText = total === 1 ? 'solution' : 'solutions';
                elements.resultsCount.innerHTML = `Showing <span class="count-number">${total}</span> ${solutionText}`;
            }
        } catch (error) {
            console.error('Error updating results count:', error);
        }
    }

    function toggleEmptyState(show) {
        try {
            if (elements.solutionsGrid) {
                elements.solutionsGrid.hidden = show;
            }

            if (elements.emptyState) {
                elements.emptyState.hidden = !show;
            }

            if (show) {
                updateEmptyStateMessage();
            }
        } catch (error) {
            console.error('Error toggling empty state:', error);
        }
    }

    function updateEmptyStateMessage() {
        try {
            const hasSearch = state.searchQuery && state.searchQuery.length > 0;
            const activeFilter = state.currentCategory !== 'all';
            const filterName = getActiveFilterName();

            let message = '';

            if (hasSearch && activeFilter) {
                message = `No matches for "<strong>${state.searchQuery}</strong>" in <strong>${filterName}</strong>`;
            } else if (hasSearch) {
                message = `No matches for "<strong>${state.searchQuery}</strong>"`;
            } else if (activeFilter) {
                message = `No solutions found in <strong>${filterName}</strong>`;
            } else {
                message = 'Try adjusting your search or browse all categories to discover resources that might help';
            }

            if (elements.emptyStateMessage) {
                elements.emptyStateMessage.innerHTML = message;
            }

            // Show/hide relevant suggestion buttons
            if (elements.btnViewAll && elements.btnClearSearch) {
                elements.btnViewAll.style.display = activeFilter ? 'inline-block' : 'none';
                elements.btnClearSearch.style.display = hasSearch ? 'inline-block' : 'none';
            }
        } catch (error) {
            console.error('Error updating empty state message:', error);
        }
    }

    function getActiveFilterName() {
        try {
            const activeButton = document.querySelector('.filter-pill.active');
            return activeButton && activeButton.textContent ? activeButton.textContent.trim() : 'All Solutions';
        } catch (error) {
            console.error('Error getting active filter name:', error);
            return 'All Solutions';
        }
    }

    function announceResults(count) {
        try {
            // Update the live region for screen readers
            const message = count === 0
                ? 'No solutions found. Try adjusting your search or filters.'
                : `${count} ${count === 1 ? 'solution' : 'solutions'} found`;

            // Update the aria-live region
            if (elements.resultsCount) {
                elements.resultsCount.setAttribute('aria-label', message);
            }
        } catch (error) {
            console.error('Error announcing results:', error);
        }
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    function setupKeyboardNavigation() {
        try {
            // Arrow key navigation for filter pills
            const filterContainer = document.querySelector('.filter-controls');

            if (filterContainer && elements.filterButtons && elements.filterButtons.length > 0) {
                filterContainer.addEventListener('keydown', function(e) {
                    try {
                        const current = document.activeElement;

                        if (!current || !current.classList.contains('filter-pill')) return;

                        const pills = Array.from(elements.filterButtons);
                        const currentIndex = pills.indexOf(current);

                        if (currentIndex === -1) return;

                        let nextIndex;

                        switch(e.key) {
                            case 'ArrowRight':
                            case 'ArrowDown':
                                e.preventDefault();
                                nextIndex = (currentIndex + 1) % pills.length;
                                if (pills[nextIndex]) {
                                    pills[nextIndex].focus();
                                }
                                break;

                            case 'ArrowLeft':
                            case 'ArrowUp':
                                e.preventDefault();
                                nextIndex = currentIndex - 1;
                                if (nextIndex < 0) nextIndex = pills.length - 1;
                                if (pills[nextIndex]) {
                                    pills[nextIndex].focus();
                                }
                                break;

                            case 'Home':
                                e.preventDefault();
                                if (pills[0]) {
                                    pills[0].focus();
                                }
                                break;

                            case 'End':
                                e.preventDefault();
                                if (pills[pills.length - 1]) {
                                    pills[pills.length - 1].focus();
                                }
                                break;
                        }
                    } catch (error) {
                        console.error('Error in keyboard navigation handler:', error);
                    }
                });
            }

            // Escape key clears search
            document.addEventListener('keydown', function(e) {
                try {
                    if (e.key === 'Escape' && elements.searchInput && elements.searchInput.value && elements.searchClear) {
                        elements.searchClear.click();
                    }
                } catch (error) {
                    console.error('Error in escape key handler:', error);
                }
            });
        } catch (error) {
            console.error('Error setting up keyboard navigation:', error);
        }
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
