# Web Design Catalog - Code Conventions

## CSS Naming (BEM)

### Blocks
```css
.component-name { }
.catalog-card { }
.booking-form { }
```

### Elements
```css
.component-name__element { }
.catalog-card__header { }
.catalog-card__title { }
```

### Modifiers
```css
.component-name--modifier { }
.catalog-card--featured { }
.btn--primary { }
```

## CSS Custom Properties

### Colors
```css
--color-primary: #4A7C8C;
--color-primary-dark: #2F5A68;
--color-text: #2C3E50;
```

### Spacing
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
```

## JavaScript

### Variables: camelCase
```javascript
const userName = 'value';
let isActive = true;
```

### Functions: camelCase
```javascript
function handleSubmit() { }
function validateEmail(email) { }
```

### Constants: UPPER_SNAKE_CASE
```javascript
const MAX_ITEMS = 10;
const API_URL = '/api';
```

## HTML

### IDs: kebab-case
```html
<div id="main-content">
<input id="user-email">
```

### Data attributes: kebab-case
```html
<button data-action="submit">
<div data-component="modal">
```

## File Naming

- Components: `component-name.html`, `component-name.css`, `component-name.js`
- Kebab-case for all files
- Group related files by name prefix
