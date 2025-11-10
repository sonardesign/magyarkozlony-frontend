# Pages Directory

This directory contains page-specific SCSS files.

## Structure

Each page that requires unique styling should have its own SCSS file:

```
pages/
├── _home.scss              ← Homepage (index.html)
├── _tanusitvanyok.scss     ← Certificate verification page
├── _segitseg.scss          ← Help page (future)
├── _rss.scss               ← RSS page (future)
└── README.md               ← This file
```

## Naming Convention

- **File names:** `_pagename.scss` (with leading underscore)
- **Import in main.scss:** `@use 'pages/pagename';`

## When to Create a Page-Specific File

Create a new page SCSS file when:
- The page has unique layout requirements
- The page needs custom components not used elsewhere
- The page-specific styles are substantial (10+ lines)

## Example: Tanusitvanyok Page

**File:** `_tanusitvanyok.scss`

**Contains:**
- `.tanusitvanyok-form` - Form container
- `.tanusitvanyok-inputs-1` - First input group
- `.tanusitvanyok-inputs-2` - Second input group
- Responsive adjustments

## Best Practices

1. **Use the abstracts:**
   ```scss
   @use '../abstracts' as *;
   ```

2. **Prefix classes with page name:**
   ```scss
   .tanusitvanyok-form { }      // ✅ Good
   .custom-form { }             // ❌ Too generic
   ```

3. **Keep it minimal:**
   - Only page-specific styles here
   - Reuse components when possible
   - Don't duplicate existing styles

4. **Document the purpose:**
   - Add comments for complex styles
   - Explain why page-specific style is needed

## Adding a New Page

1. **Create the SCSS file:**
   ```bash
   # Create new page SCSS
   touch src/scss/pages/_mypage.scss
   ```

2. **Add page styles:**
   ```scss
   // _mypage.scss
   @use '../abstracts' as *;
   
   .mypage-container {
     // Custom styles
   }
   ```

3. **Import in main.scss:**
   ```scss
   // Add to the Pages section
   @use 'pages/mypage';
   ```

4. **Compile:**
   ```bash
   npm run scss:dev
   ```

## Current Pages

| Page | File | Classes |
|------|------|---------|
| Homepage | `_home.scss` | `.gasette-listing`, `.listing`, `.list-items`, `.content`, `.intro-text`, `.justicia`, `.kozlonyszam-*`, `.gasette-link` |
| Tanúsítványok | `_tanusitvanyok.scss` | `.tanusitvanyok-form`, `.tanusitvanyok-inputs-1`, `.tanusitvanyok-inputs-2` |
| Segítség | (future) | - |
| RSS | (future) | - |

### Homepage (`_home.scss`)

**Purpose:** Contains all styles specific to the homepage (index.html) gazette listing and layout.

**Key Components:**
- **Gazette Listing:** `.gasette-listing`, `.listing`, `.list-items` - Main content area for gazette items
- **Content Layout:** `.content` - Main content wrapper with negative margin overlap
- **Intro Text:** `.intro-text-wrapper`, `.intro-text` - Welcome text section
- **Justicia Image:** `.justicia` - Decorative justice statue image
- **Gazette Cards:** `.kozlonyszam-wrapper`, `.kozlonyszam-texts`, etc. - Gazette item styling
- **Links:** `.gasette-link` - Gazette title links

**Responsive Behavior:**
- Desktop (>991px): Two-column layout with gazette listing (70%) and sidebar (30%)
- Tablet (768-991px): Single column, justicia image scaled down
- Mobile (<768px): Full-width layout, compact gazette cards

---

**Remember:** Keep page styles focused and minimal. Reuse existing components whenever possible!

