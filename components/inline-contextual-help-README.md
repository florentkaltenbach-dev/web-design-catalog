# Inline Contextual Help Component

A complete, production-ready contextual help system. Provides calm, trust-building, non-intrusive help experiences with full accessibility support.

## Features

### Three Trigger Types

1. **Tooltip Help** - Brief clarifications that appear on hover/focus
2. **Popover Help** - Detailed explanations that appear on click with dismiss controls
3. **Inline Expandable Help** - Content that expands naturally within the page flow

### Accessibility Features

- ✅ WCAG 2.1 AA compliant
- ✅ Full keyboard navigation (Tab, Enter, Space, Escape)
- ✅ Screen reader support with proper ARIA attributes
- ✅ Focus management and return
- ✅ Reduced motion support
- ✅ High contrast mode support
- ✅ Touch-friendly (44x44px minimum targets)
- ✅ Smart positioning with viewport collision detection

### Technical Features

- Semantic HTML5 markup
- Modern CSS with custom properties
- Vanilla JavaScript (no dependencies)
- Smart viewport positioning
- Touch device detection and adaptation
- Smooth animations with reduced motion support
- Responsive design
- Print-friendly

## File Structure

```
inline-contextual-help.html    # Complete component with examples
inline-contextual-help.css     # Styles with design tokens
inline-contextual-help.js      # Full functionality
inline-contextual-help-README.md   # This documentation
```

## Usage Examples

### 1. Tooltip Help (Hover/Focus)

**Use case:** Brief clarifications, definitions, or supplementary information

```html
<label for="email-input">
    Email Address
    <button type="button"
            class="help-trigger help-trigger--tooltip"
            data-help-type="tooltip"
            data-help-id="email-help"
            aria-label="Help about email address"
            aria-describedby="email-help-content">
        <svg class="help-icon" width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
    </button>
</label>
<input type="email" id="email-input" placeholder="your@email.com">

<div id="email-help-content"
     class="help-content help-content--tooltip"
     role="tooltip"
     aria-hidden="true">
    <div class="help-content__inner">
        We'll use this to send you appointment reminders and secure messages.
    </div>
</div>
```

### 2. Popover Help (Click)

**Use case:** Detailed explanations, lists, multi-paragraph content

```html
<label for="safety-plan">
    Safety Plan
    <button type="button"
            class="help-trigger help-trigger--popover"
            data-help-type="popover"
            data-help-id="safety-plan-help"
            aria-label="Learn more about safety plans"
            aria-expanded="false"
            aria-controls="safety-plan-help-content">
        <svg class="help-icon" width="18" height="18" viewBox="0 0 18 18">
            <!-- icon SVG -->
        </svg>
        <span class="help-trigger__text">Help</span>
    </button>
</label>

<div id="safety-plan-help-content"
     class="help-content help-content--popover"
     role="dialog"
     aria-modal="false"
     aria-hidden="true"
     aria-labelledby="safety-plan-help-title">
    <div class="help-content__inner">
        <div class="help-content__header">
            <h3 id="safety-plan-help-title" class="help-content__title">About Safety Plans</h3>
            <button type="button" class="help-content__close" aria-label="Close help">
                <!-- close icon -->
            </button>
        </div>
        <div class="help-content__body">
            <p>A safety plan helps you identify:</p>
            <ul>
                <li>Warning signs that you might be struggling</li>
                <li>Coping strategies that work for you</li>
                <li>People and places that help you feel safe</li>
            </ul>
        </div>
    </div>
</div>
```

### 3. Inline Expandable Help

**Use case:** Help that should remain in content flow, non-disruptive

```html
<p>
    This assessment uses a
    <button type="button"
            class="help-trigger help-trigger--expandable"
            data-help-type="expandable"
            data-help-id="validated-scale-help"
            aria-expanded="false"
            aria-controls="validated-scale-help-content">
        <span class="help-trigger__underline">clinically validated scale</span>
        <svg class="help-icon help-icon--small" width="14" height="14">
            <path d="M7 4V10M4 7H10" stroke="currentColor"/>
        </svg>
    </button>
    to provide the best support.
</p>

<div id="validated-scale-help-content"
     class="help-content help-content--expandable"
     aria-hidden="true">
    <div class="help-content__inner">
        <p><strong>What does "clinically validated" mean?</strong></p>
        <p>It means the questions have been carefully tested with thousands of people...</p>
    </div>
</div>
```

## HTML Structure Requirements

### Required Attributes

**Trigger Button:**
- `data-help-type`: "tooltip", "popover", or "expandable"
- `data-help-id`: Unique identifier (without "-content" suffix)
- `aria-label`: Descriptive label for screen readers
- `aria-describedby`: ID of content element (for tooltips)
- `aria-expanded`: "true" or "false" (for popovers and expandables)
- `aria-controls`: ID of content element (for popovers and expandables)

**Content Element:**
- `id`: Must be `{help-id}-content`
- `role`: "tooltip" for tooltips, "dialog" for popovers
- `aria-hidden`: "true" (initial state)
- `aria-labelledby`: ID of title element (for popovers)

### Visual Trigger Variations

**Info Icon (Default):**
```html
<svg class="help-icon" width="16" height="16">
    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

**Question Mark:**
```html
<svg class="help-icon" width="18" height="18">
    <circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/>
    <path d="M6.5 7C6.5 5.61929 7.61929 4.5 9 4.5C10.3807 4.5 11.5 5.61929 11.5 7C11.5 8.06 10.8 8.93 9.8 9.24C9.3 9.39 9 9.85 9 10.35V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="9" cy="13" r="0.75" fill="currentColor"/>
</svg>
```

**Dotted Underline (Inline):**
```html
<span class="help-trigger__underline">term to explain</span>
```

## CSS Customization

### Design Tokens

All visual properties use CSS custom properties for easy theming:

```css
:root {
    /* Colors */
    --color-primary: #5B8A9F;
    --color-help-trigger: #6B96AC;
    --color-help-bg: #FFFFFF;

    /* Spacing */
    --spacing-sm: 8px;
    --spacing-md: 16px;

    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);

    /* Shadows */
    --shadow-tooltip: 0 2px 8px rgba(43, 62, 80, 0.1);
    --shadow-popover: 0 8px 32px rgba(43, 62, 80, 0.15);
}
```

### Key CSS Classes

- `.help-trigger` - Base trigger button
- `.help-trigger--tooltip` - Tooltip variant
- `.help-trigger--popover` - Popover variant
- `.help-trigger--expandable` - Expandable variant
- `.help-trigger--inline` - Inline underlined text
- `.help-trigger--question` - Question mark style
- `.help-content` - Base content container
- `.help-content--tooltip` - Tooltip content
- `.help-content--popover` - Popover content
- `.help-content--expandable` - Expandable content

## JavaScript API

### Initialization

The system initializes automatically on DOM ready:

```javascript
// Access the global instance
const helpSystem = window.contextualHelpSystem;
```

### Public Methods

**Show help programmatically:**
```javascript
helpSystem.show('email-help');
```

**Hide help programmatically:**
```javascript
helpSystem.hide('email-help');
```

**Destroy instance:**
```javascript
helpSystem.destroy();
```

### Configuration

Modify configuration after initialization:

```javascript
helpSystem.config.tooltipDelay = 500; // Increase tooltip delay
helpSystem.config.hideDelay = 200; // Increase hide delay
```

## Keyboard Navigation

- **Tab**: Navigate between help triggers
- **Enter/Space**: Activate help trigger
- **Escape**: Close active help and return focus to trigger
- **Tab** (in popover): Navigate through focusable elements
- **Shift+Tab** (in popover): Navigate backwards, close on first element

## Screen Reader Support

### Announcements

- Tooltip triggers announce content via `aria-describedby`
- Popover state changes announced via `aria-expanded`
- Popover titles connected via `aria-labelledby`
- Opening popovers creates polite announcement

### ARIA Attributes

- `role="tooltip"` for tooltips
- `role="dialog"` for popovers
- `aria-modal="false"` for non-modal popovers
- `aria-hidden` state management
- `aria-expanded` state for interactive elements
- `aria-controls` relationship indicators

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### Progressive Enhancement

- Works without JavaScript (basic show/hide with CSS)
- Graceful degradation for older browsers
- Touch device adaptation
- Print stylesheet included

## Performance Considerations

- Lazy initialization (only active triggers get events)
- Debounced resize handling
- Efficient DOM queries with caching
- Minimal reflows during positioning
- CSS transitions use transform for GPU acceleration

## Design Guidelines

### When to Use Each Type

**Tooltip:**
- Brief definitions (1-2 sentences)
- Supplementary information
- Format requirements
- Quick clarifications

**Popover:**
- Multi-paragraph explanations
- Bulleted lists
- Step-by-step instructions
- Detailed context

**Inline Expandable:**
- In-content explanations
- Non-critical information
- Progressive disclosure
- Reading flow maintenance

### Best Practices

1. **Don't overuse** - Too many help triggers overwhelm users
2. **Clear context** - Make it obvious what the help is about
3. **Concise content** - Keep help text brief and scannable
4. **Consistent placement** - Place triggers in predictable locations
5. **Test with users** - Verify help is actually helpful
6. **Accessible first** - Test with keyboard and screen readers

### Content Writing

- **Use plain language** - Avoid jargon unless explaining jargon
- **Be specific** - "Enter your email address" not "Enter your credentials"
- **Stay calm** - Use reassuring, non-clinical language
- **Be helpful** - Answer the question they're actually asking
- **Respect privacy** - Explain why you need information

## Integration with Design System

This component follows these design principles:

- **Calm visual design** - Soft colors, gentle animations
- **Trust-building** - Clear explanations, transparency
- **Non-clinical language** - Approachable, human tone
- **Non-triggering** - Careful word choices, gentle interactions
- **Accessibility first** - WCAG AA compliance throughout

### Color Palette

Colors chosen for:
- High contrast (4.5:1 minimum)
- Calm, professional appearance
- Clear distinction between states
- Reduced visual stress

## Troubleshooting

### Content Not Appearing

- Check `data-help-id` matches content `id` (without "-content")
- Verify `aria-hidden="true"` initial state
- Confirm JavaScript loaded and initialized

### Positioning Issues

- Ensure parent containers don't have `overflow: hidden`
- Check z-index stacking contexts
- Verify viewport space calculations

### Keyboard Navigation Not Working

- Confirm trigger is focusable (`<button>` or `tabindex="0"`)
- Check event listeners attached (inspect `_helpContent` property)
- Verify no JavaScript errors in console

## License

This component is part of the Web Design Pattern Catalog. Refer to project license for usage terms.

## Support

For questions or issues with this component, refer to the design system documentation or contact the development team.

---

**Version:** 1.0.0
**Last Updated:** 2025-12-04
**Status:** Production Ready
