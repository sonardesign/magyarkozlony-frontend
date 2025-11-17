# Paginator Module

## Overview
The paginator module provides interactive pagination controls with automatic active state management.

## Features
- ✅ Automatic active state toggle on page click
- ✅ Previous/Next button state management (enabled/disabled)
- ✅ Keyboard accessibility support
- ✅ Custom event dispatching for external listeners
- ✅ Programmatic page selection API
- ✅ Integrated with main app initialization

## HTML Structure

```html
<div class="paginator">
  <!-- Previous Button -->
  <button class="paginator-button disabled" disabled aria-label="Previous page">
    <i class="ri-arrow-left-s-line"></i>
  </button>

  <!-- Page Numbers -->
  <a href="#" class="paginator-page active" aria-current="page">1</a>
  <a href="#" class="paginator-page">2</a>
  <a href="#" class="paginator-page">3</a>
  <a href="#" class="paginator-page">4</a>
  <a href="#" class="paginator-page">5</a>
  <span class="paginator-page ellipsis">...</span>
  <a href="#" class="paginator-page">14</a>

  <!-- Next Button -->
  <button class="paginator-button enabled" aria-label="Next page">
    <i class="ri-arrow-right-s-line"></i>
  </button>
</div>
```

## Usage

### Initialization
The paginator is initialized automatically via `app.js`. No additional setup needed!

### Manual Initialization (if needed)
```javascript
import { initPaginator } from './modules/paginator.js';

// Initialize all paginators
initPaginator();

// Initialize specific paginator
initPaginator('.my-custom-paginator');
```

### Programmatic Page Selection
```javascript
import { setActivePage } from './modules/paginator.js';

const paginator = document.querySelector('.paginator');
setActivePage(paginator, 3); // Set page 3 as active
```

### Listen to Page Changes
```javascript
const paginator = document.querySelector('.paginator');

paginator.addEventListener('paginatorChange', (event) => {
  const pageNumber = event.detail.pageNumber;
  const pageElement = event.detail.pageElement;
  
  console.log(`Changed to page ${pageNumber}`);
  
  // Load content for the new page
  loadPageContent(pageNumber);
});
```

## Behavior

### Page Click
- Removes `active` class from current page
- Adds `active` class to clicked page
- Updates `aria-current` attribute
- Updates prev/next button states
- Dispatches `paginatorChange` custom event

### Previous Button
- Navigates to the previous page number
- Automatically disabled when on first page
- Automatically enabled when not on first page

### Next Button
- Navigates to the next page number
- Automatically disabled when on last page
- Automatically enabled when not on last page

### Ellipsis
- Non-interactive (`.ellipsis` class)
- Used to indicate skipped page numbers

## CSS Classes

### Required Classes
- `.paginator` - Container for pagination controls
- `.paginator-page` - Individual page number link
- `.paginator-button` - Previous/Next navigation buttons

### State Classes
- `.active` - Currently selected page (bold, underlined)
- `.enabled` - Active navigation button (clickable)
- `.disabled` - Inactive navigation button (grayed out)
- `.ellipsis` - Non-clickable ellipsis indicator

## Accessibility

- Uses `aria-label` for screen reader support
- Uses `aria-current="page"` for current page indication
- Proper keyboard navigation support
- Disabled state properly communicated via `disabled` attribute

## Browser Support
- All modern browsers (ES6+ required)
- Chrome, Firefox, Safari, Edge

## Dependencies
- None (vanilla JavaScript)

