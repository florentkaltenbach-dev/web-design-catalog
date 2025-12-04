/**
 * Inline Contextual Help Component
 * BKID Design System
 *
 * Features:
 * - Multiple trigger types (tooltip, popover, expandable)
 * - Smart positioning with viewport collision detection
 * - Full keyboard navigation support
 * - ARIA-compliant screen reader support
 * - Reduced motion support
 * - Touch device handling
 */

class ContextualHelpSystem {
    constructor() {
        this.activeHelp = null;
        this.triggers = [];
        this.config = {
            tooltipDelay: 300,
            hideDelay: 150,
            touchDeviceClickMode: this.isTouchDevice()
        };
        this.timeouts = new Map();

        this.init();
    }

    /**
     * Detect touch device
     */
    isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }

    /**
     * Initialize the help system
     */
    init() {
        // Find all help triggers
        this.triggers = Array.from(document.querySelectorAll('[data-help-type]'));

        // Attach event listeners
        this.triggers.forEach(trigger => {
            this.attachTriggerEvents(trigger);
        });

        // Global event listeners
        document.addEventListener('click', (e) => this.handleDocumentClick(e));
        document.addEventListener('keydown', (e) => this.handleDocumentKeydown(e));

        // Handle window resize for repositioning
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * Attach events to a help trigger
     */
    attachTriggerEvents(trigger) {
        const helpType = trigger.getAttribute('data-help-type');
        const helpId = trigger.getAttribute('data-help-id');
        const contentEl = document.getElementById(`${helpId}-content`);

        if (!contentEl) {
            console.warn(`Help content not found for trigger: ${helpId}`);
            return;
        }

        // Store reference
        trigger._helpContent = contentEl;
        contentEl._helpTrigger = trigger;

        // Attach appropriate events based on type
        switch (helpType) {
            case 'tooltip':
                this.attachTooltipEvents(trigger, contentEl);
                break;
            case 'popover':
                this.attachPopoverEvents(trigger, contentEl);
                break;
            case 'expandable':
                this.attachExpandableEvents(trigger, contentEl);
                break;
        }

        // Close button in popover
        if (helpType === 'popover') {
            const closeBtn = contentEl.querySelector('.help-content__close');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.hideHelp(contentEl);
                    trigger.focus();
                });
            }
        }
    }

    /**
     * Attach tooltip events (hover/focus)
     */
    attachTooltipEvents(trigger, contentEl) {
        // On touch devices, convert to click
        if (this.config.touchDeviceClickMode) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleHelp(trigger, contentEl);
            });
            return;
        }

        // Mouse events
        trigger.addEventListener('mouseenter', () => {
            this.clearTimeout(contentEl);
            this.timeouts.set(contentEl, setTimeout(() => {
                this.showHelp(trigger, contentEl);
            }, this.config.tooltipDelay));
        });

        trigger.addEventListener('mouseleave', () => {
            this.clearTimeout(contentEl);
            this.timeouts.set(contentEl, setTimeout(() => {
                this.hideHelp(contentEl);
            }, this.config.hideDelay));
        });

        // Keep tooltip open when hovering over it
        contentEl.addEventListener('mouseenter', () => {
            this.clearTimeout(contentEl);
        });

        contentEl.addEventListener('mouseleave', () => {
            this.clearTimeout(contentEl);
            this.timeouts.set(contentEl, setTimeout(() => {
                this.hideHelp(contentEl);
            }, this.config.hideDelay));
        });

        // Keyboard events
        trigger.addEventListener('focus', () => {
            this.showHelp(trigger, contentEl);
        });

        trigger.addEventListener('blur', () => {
            // Slight delay to allow focus to move to content if needed
            setTimeout(() => {
                if (!contentEl.contains(document.activeElement) &&
                    document.activeElement !== trigger) {
                    this.hideHelp(contentEl);
                }
            }, 100);
        });

        // Enter/Space to trigger
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.showHelp(trigger, contentEl);
            }
        });
    }

    /**
     * Attach popover events (click)
     */
    attachPopoverEvents(trigger, contentEl) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleHelp(trigger, contentEl);
        });

        // Keyboard activation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                this.toggleHelp(trigger, contentEl);
            }
        });
    }

    /**
     * Attach expandable events (click to expand inline)
     */
    attachExpandableEvents(trigger, contentEl) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleExpandable(trigger, contentEl);
        });

        // Keyboard activation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleExpandable(trigger, contentEl);
            }
        });
    }

    /**
     * Show help content
     */
    showHelp(trigger, contentEl) {
        const helpType = trigger.getAttribute('data-help-type');

        // Close other active help (except expandables)
        if (this.activeHelp && this.activeHelp !== contentEl && helpType !== 'expandable') {
            this.hideHelp(this.activeHelp);
        }

        // Show content
        contentEl.setAttribute('aria-hidden', 'false');

        // Update trigger state
        if (trigger.hasAttribute('aria-expanded')) {
            trigger.setAttribute('aria-expanded', 'true');
        }

        // Position if needed (tooltips and popovers)
        if (helpType === 'tooltip' || helpType === 'popover') {
            this.positionContent(trigger, contentEl);
        }

        this.activeHelp = contentEl;

        // Announce to screen readers
        this.announceToScreenReader(contentEl);
    }

    /**
     * Hide help content
     */
    hideHelp(contentEl) {
        if (!contentEl) return;

        contentEl.setAttribute('aria-hidden', 'true');

        const trigger = contentEl._helpTrigger;
        if (trigger && trigger.hasAttribute('aria-expanded')) {
            trigger.setAttribute('aria-expanded', 'false');
        }

        if (this.activeHelp === contentEl) {
            this.activeHelp = null;
        }
    }

    /**
     * Toggle help (for click-based interactions)
     */
    toggleHelp(trigger, contentEl) {
        const isHidden = contentEl.getAttribute('aria-hidden') === 'true';

        if (isHidden) {
            this.showHelp(trigger, contentEl);
        } else {
            this.hideHelp(contentEl);
            trigger.focus();
        }
    }

    /**
     * Toggle expandable (inline expansion)
     */
    toggleExpandable(trigger, contentEl) {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            contentEl.setAttribute('aria-hidden', 'true');
            trigger.setAttribute('aria-expanded', 'false');
        } else {
            contentEl.setAttribute('aria-hidden', 'false');
            trigger.setAttribute('aria-expanded', 'true');

            // Smooth scroll into view if needed
            setTimeout(() => {
                if (this.isElementPartiallyOutOfView(contentEl)) {
                    contentEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 300);
        }
    }

    /**
     * Position help content relative to trigger
     */
    positionContent(trigger, contentEl) {
        // Reset positioning classes
        contentEl.classList.remove(
            'help-content--positioned-top',
            'help-content--positioned-bottom',
            'help-content--positioned-left',
            'help-content--positioned-right',
            'help-content--positioned-center'
        );

        const triggerRect = trigger.getBoundingClientRect();
        const contentRect = contentEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const space = {
            top: triggerRect.top,
            bottom: viewportHeight - triggerRect.bottom,
            left: triggerRect.left,
            right: viewportWidth - triggerRect.right
        };

        // Determine vertical position (prefer bottom)
        let verticalClass;
        if (space.bottom >= contentRect.height || space.bottom >= space.top) {
            verticalClass = 'help-content--positioned-bottom';
        } else {
            verticalClass = 'help-content--positioned-top';
        }

        // Determine horizontal position
        let horizontalClass;
        const triggerCenter = triggerRect.left + (triggerRect.width / 2);
        const contentHalfWidth = contentRect.width / 2;

        if (triggerCenter >= contentHalfWidth &&
            triggerCenter <= viewportWidth - contentHalfWidth) {
            // Enough space to center
            horizontalClass = 'help-content--positioned-center';
        } else if (space.left < space.right) {
            // Align to left edge
            horizontalClass = 'help-content--positioned-right';
        } else {
            // Align to right edge
            horizontalClass = 'help-content--positioned-left';
        }

        contentEl.classList.add(verticalClass, horizontalClass);
    }

    /**
     * Check if element is partially out of viewport
     */
    isElementPartiallyOutOfView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom > window.innerHeight ||
            rect.top < 0
        );
    }

    /**
     * Handle clicks outside help content
     */
    handleDocumentClick(e) {
        if (!this.activeHelp) return;

        const trigger = this.activeHelp._helpTrigger;
        const helpType = trigger.getAttribute('data-help-type');

        // Don't close expandables on outside click
        if (helpType === 'expandable') return;

        // Check if click is outside both trigger and content
        if (!this.activeHelp.contains(e.target) &&
            !trigger.contains(e.target)) {
            this.hideHelp(this.activeHelp);
        }
    }

    /**
     * Handle document-level keyboard events
     */
    handleDocumentKeydown(e) {
        if (!this.activeHelp) return;

        // Escape key closes active help
        if (e.key === 'Escape') {
            e.preventDefault();
            const trigger = this.activeHelp._helpTrigger;
            this.hideHelp(this.activeHelp);
            if (trigger) {
                trigger.focus();
            }
        }

        // Tab key management for popovers
        const trigger = this.activeHelp._helpTrigger;
        const helpType = trigger.getAttribute('data-help-type');

        if (helpType === 'popover' && e.key === 'Tab') {
            this.handlePopoverTabbing(e);
        }
    }

    /**
     * Handle tabbing within popover
     */
    handlePopoverTabbing(e) {
        const focusableElements = this.activeHelp.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // If shift+tab on first element, close and return to trigger
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            const trigger = this.activeHelp._helpTrigger;
            this.hideHelp(this.activeHelp);
            trigger.focus();
        }

        // If tab on last element, close and continue to next focusable
        if (!e.shiftKey && document.activeElement === lastElement) {
            // Let it proceed naturally
            this.hideHelp(this.activeHelp);
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        if (!this.activeHelp) return;

        const trigger = this.activeHelp._helpTrigger;
        const helpType = trigger.getAttribute('data-help-type');

        // Reposition tooltips and popovers
        if (helpType === 'tooltip' || helpType === 'popover') {
            this.positionContent(trigger, this.activeHelp);
        }
    }

    /**
     * Clear timeout for a specific element
     */
    clearTimeout(element) {
        const timeout = this.timeouts.get(element);
        if (timeout) {
            clearTimeout(timeout);
            this.timeouts.delete(element);
        }
    }

    /**
     * Announce content to screen readers
     */
    announceToScreenReader(contentEl) {
        // The aria-describedby and role attributes handle this,
        // but we can add live region support if needed
        const trigger = contentEl._helpTrigger;
        const helpType = trigger.getAttribute('data-help-type');

        // For popovers, we might want to announce they opened
        if (helpType === 'popover') {
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = 'Help dialog opened';
            document.body.appendChild(announcement);

            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    }

    /**
     * Public API: Programmatically show help
     */
    show(helpId) {
        const contentEl = document.getElementById(`${helpId}-content`);
        if (contentEl && contentEl._helpTrigger) {
            this.showHelp(contentEl._helpTrigger, contentEl);
        }
    }

    /**
     * Public API: Programmatically hide help
     */
    hide(helpId) {
        const contentEl = document.getElementById(`${helpId}-content`);
        if (contentEl) {
            this.hideHelp(contentEl);
        }
    }

    /**
     * Public API: Destroy and cleanup
     */
    destroy() {
        // Clear all timeouts
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts.clear();

        // Remove event listeners (simplified - in production, track all listeners)
        this.triggers.forEach(trigger => {
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
        });

        this.triggers = [];
        this.activeHelp = null;
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contextualHelpSystem = new ContextualHelpSystem();
    });
} else {
    window.contextualHelpSystem = new ContextualHelpSystem();
}

// Add screen-reader-only class for accessibility announcements
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);

/**
 * Export for module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContextualHelpSystem;
}
