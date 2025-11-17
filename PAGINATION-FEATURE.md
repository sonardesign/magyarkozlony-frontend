# JSON-Based Pagination Feature

## Overview

The home page now features **JSON-based dynamic content** with **full pagination support**. This allows displaying 100+ gazette entries with proper pagination, where each page has its own unique URL.

## Key Features

✅ **150 dynamically generated gazette entries**  
✅ **10 items per page** (15 total pages)  
✅ **Unique URLs for each page** (/, /page/2, /page/3, etc.)  
✅ **Featured item on page 1**  
✅ **Automatic title incrementing** (Magyar Közlöny 2025. évi 21-170. szám)  
✅ **Smart paginator** with ellipsis (1 ... 4 5 [6] 7 8 ... 15)  
✅ **Fully navigable** with browser back/forward buttons  

## Architecture

### **1. Data Layer (`gazette-data.js`)**

**`GazetteDataService`** - Generates and manages gazette data

```javascript
import { gazetteData } from './modules/gazette-data.js';

// Get page 1 (10 items + featured)
const page1 = gazetteData.getPage(1);

// Get page 5
const page5 = gazetteData.getPage(5);

// Get all gazettes
const all = gazetteData.getAll(); // 150 items
```

**Generated Data Structure:**
```javascript
{
  id: 1,
  title: "Magyar Közlöny 2025. évi 170. szám",
  date: "2025. június 20.",
  year: 2025,
  number: 170,
  pdfUrl: "#gazette-170",
  reasonsUrl: "#reasons-170",
  attachmentsUrl: "#attachments-170",
  isFeatured: true // Only first item
}
```

**Configuration:**
- `totalItems`: 150 gazettes
- `itemsPerPage`: 10 per page
- `startNumber`: 21 (first gazette number)
- `endNumber`: 170 (last gazette number)
- `year`: 2025

### **2. Rendering Layer (`gazette-renderer.js`)**

**`GazetteRenderer`** - Converts JSON data to HTML

```javascript
import { gazetteRenderer } from './modules/gazette-renderer.js';

// Render a single card
const cardHTML = gazetteRenderer.renderCard(gazette);

// Render featured section (page 1 only)
const featuredHTML = gazetteRenderer.renderFeaturedSection(gazette);

// Render paginator
const paginatorHTML = gazetteRenderer.renderPaginator(currentPage, totalPages);

// Render complete section
const pageHTML = gazetteRenderer.renderGazetteSection(pageData);
```

**Smart Paginator Logic:**
- Shows current page and 2 pages on each side
- Shows first and last pages always
- Uses ellipsis for gaps
- Examples:
  - Page 1: `[1] 2 3 ... 15`
  - Page 6: `1 ... 4 5 [6] 7 8 ... 15`
  - Page 15: `1 ... 13 14 [15]`

### **3. Router Integration**

**Pattern-Based Routes** - Supports dynamic parameters

```javascript
// Route definitions
const pages = [
  {
    path: '/',
    name: 'index',
    dynamic: true,
    page: 1
  },
  {
    path: '/page/:page',
    name: 'index-paginated',
    dynamic: true,
    isPattern: true  // Supports /page/2, /page/3, etc.
  }
];
```

**Route Matching:**
- `/` → Page 1
- `/page/2` → Page 2
- `/page/15` → Page 15
- `/page/invalid` → Redirects to Page 1

**URL Rewrites (vercel.json):**
```json
{
  "rewrites": [
    {
      "source": "/page/:page",
      "destination": "/index.html"
    }
  ]
}
```

## How It Works

### **Navigation Flow:**

1. **User clicks "2" in paginator**
2. **Router intercepts**: `/page/2`
3. **Route matched**: `/page/:page` pattern with `params.page = "2"`
4. **Data fetched**: `gazetteData.getPage(2)`
5. **Content rendered**: `gazetteRenderer.renderGazetteSection(pageData)`
6. **DOM updated**: Body content replaced
7. **Modules reinit**: Paginator, dropdowns, etc.
8. **URL updated**: Browser shows `/page/2`
9. **History added**: Back button works

### **Featured Item Logic:**

**Page 1:**
- Shows newest gazette in "Legfrissebb Közlönyök" section
- Shows next 9 items in "További Közlönyök" section

**Page 2+:**
- No "Legfrissebb Közlönyök" section
- Shows 10 items in "További Közlönyök" section

### **Paginator Behavior:**

```javascript
// Previous button
- Disabled on page 1
- Navigates to current - 1

// Next button
- Disabled on last page
- Navigates to current + 1

// Page numbers
- Click navigates to that page
- Current page highlighted with .active
- Prev/next disabled based on position
```

## Usage Examples

### **Customize Data**

Edit `src/js/modules/gazette-data.js`:

```javascript
constructor() {
  this.itemsPerPage = 20;      // Show 20 per page
  this.totalItems = 200;       // Generate 200 items
  this.startNumber = 1;        // Start from number 1
  this.year = 2026;            // Change year
}
```

### **Change Date Format**

```javascript
formatDate(date) {
  // Custom format
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
```

### **Add Filters**

```javascript
// In gazette-data.js
filterByYear(year) {
  return this.gazettes.filter(g => g.year === year);
}

// In app.js
const filtered = gazetteData.filterByYear(2025);
```

## Testing

### **Manual Testing:**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test navigation:**
   - Click page numbers
   - Click prev/next buttons
   - Use browser back/forward
   - Direct URL access: `/page/5`

3. **Verify:**
   - ✅ 10 items per page
   - ✅ Unique URLs
   - ✅ Paginator updates
   - ✅ Featured item on page 1 only
   - ✅ Correct gazette numbers
   - ✅ Dates increment

### **Console Inspection:**

```javascript
// In browser console
window.app.pageLoader.gazetteData.getAll(); // See all data
window.app.router.navigate('/page/7');      // Programmatic navigation
```

## Performance

**Benefits:**
- ✅ No separate HTML files needed
- ✅ Data generated once at load
- ✅ Fast page transitions (no HTTP requests)
- ✅ Client-side rendering
- ✅ Cached data

**Trade-offs:**
- Data is static (no real-time updates)
- All data loaded upfront (~150 items, ~15KB)
- Good for: 100-1000 items
- For 10,000+ items: Consider server-side pagination

## File Structure

```
src/
├── js/
│   ├── modules/
│   │   ├── gazette-data.js       ← Data service
│   │   ├── gazette-renderer.js   ← Rendering logic
│   │   ├── router.js             ← Pattern matching added
│   │   ├── pages.js              ← Dynamic routes added
│   │   └── ...
│   ├── data/
│   │   └── gazettes.json         ← Optional: Export data
│   └── app.js                    ← Integration point
└── ...
```

## Future Enhancements

Potential improvements:

1. **Search & Filter**
   - Search by title/date
   - Filter by year/month
   - Sort options

2. **Lazy Loading**
   - Load data on demand
   - Reduce initial bundle

3. **URL Query Params**
   - `/page/2?sort=date&year=2025`
   - Maintain filters in URL

4. **Real Data Integration**
   - Fetch from API
   - Server-side pagination
   - Real gazette PDFs

5. **SEO Optimization**
   - Pre-render pages
   - Static HTML fallbacks
   - Sitemap generation

## Migration Notes

### **Before (Static HTML):**
- 1 page with hardcoded items
- No pagination
- Manual HTML updates

### **After (Dynamic JSON):**
- 15 pages with unique URLs
- Auto-generated content
- Easy to modify data
- Scalable to 1000+ items

### **No Breaking Changes:**
- Other pages unaffected
- Existing HTML preserved
- Gradual migration possible

## Conclusion

This JSON-based pagination system provides a **modern, scalable solution** for displaying large datasets while maintaining the simplicity of vanilla JavaScript and the performance benefits of a SPA.

**Quick Stats:**
- 📊 150 gazette entries
- 📄 15 pages
- 🔗 Unique URLs
- ⚡ Instant navigation
- 🎯 Full SPA experience

