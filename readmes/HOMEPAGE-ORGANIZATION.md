# Homepage SCSS Organization - Complete

This document summarizes the organization of homepage-specific styles into a dedicated SCSS file.

## Overview

All homepage-specific CSS classes have been extracted from various component files and consolidated into a single, dedicated page file: `src/scss/pages/_home.scss`.

## What Was Done

### 1. Created New File
**File:** `src/scss/pages/_home.scss`

**Purpose:** Contains all styles specific to the homepage (index.html) layout and components.

### 2. Moved Styles From:

#### From `src/scss/layout/_container.scss`:
- ✅ `.content` (with homepage-specific negative margin)
- ✅ `.gasette-listing`
- ✅ `.listing`
- ✅ `.list-items`

#### From `src/scss/components/_search.scss`:
- ✅ `.intro-text-wrapper`
- ✅ `.intro-text`

#### From `src/scss/components/_card.scss`:
- ✅ `.kozlonyszam-wrapper`
- ✅ `.kozlonszam-content`
- ✅ `.kozlonyszam-texts`
- ✅ `.kozlonyszam-secondary-intertactions`
- ✅ `.gasette-link`

#### From `src/scss/components/_header.scss`:
- ✅ `.justicia` (decorative image)

### 3. Updated Files

**Modified:**
- ✅ `src/scss/layout/_container.scss` - Removed homepage-specific layout classes
- ✅ `src/scss/components/_search.scss` - Removed intro text classes
- ✅ `src/scss/components/_card.scss` - Kept only generic card styles
- ✅ `src/scss/components/_header.scss` - Removed justicia image styles
- ✅ `src/scss/main.scss` - Added import for `pages/home`
- ✅ `src/scss/README.md` - Updated directory structure documentation
- ✅ `src/scss/pages/README.md` - Added homepage documentation

## Structure of _home.scss

The file is organized into logical sections:

```scss
// 1. Main Content Layout
.content                    // Main wrapper with negative margin overlap

// 2. Gazette Listing Section
.gasette-listing            // Gazette listing container (70% width)
.listing                    // Listing wrapper
.list-items                 // List items container

// 3. Intro Text Section
.intro-text-wrapper         // Intro text outer wrapper
.intro-text                 // Intro text content

// 4. Justicia Decorative Image
.justicia                   // Justice statue SVG positioning

// 5. Gazette Card Components
.kozlonyszam-wrapper        // Gazette number wrapper
.kozlonszam-content         // Gazette content
.kozlonyszam-texts          // Gazette text elements
.kozlonyszam-secondary-intertactions  // Secondary actions
.gasette-link               // Gazette title link

// 6. Responsive Design
@include respond-to-medium  // Tablet adjustments
@include respond-to-small   // Mobile adjustments
@include respond-to-tiny    // Tiny screen adjustments
```

## Benefits

### 1. **Better Organization**
- All homepage styles are now in one place
- Easy to find and modify homepage-specific styles
- Clear separation between page-specific and component styles

### 2. **Improved Maintainability**
- Component files (card, search, header) now contain only reusable styles
- Page-specific overrides are isolated
- Easier to understand which styles apply where

### 3. **Scalability**
- Easy to add more page-specific files (segitseg.scss, rss.scss, etc.)
- Pattern established for future page-specific styling
- Consistent with 7-1 architecture pattern

### 4. **Cleaner Components**
- **Card component** is now truly generic and reusable
- **Search component** only contains search form styles
- **Header component** only contains header/navigation styles
- **Layout container** only contains layout primitives

## Classes in _home.scss

| Class | Purpose | Used On |
|-------|---------|---------|
| `.content` | Main content wrapper with overlap | Homepage body section |
| `.gasette-listing` | Gazette listing container | Main listing area |
| `.listing` | Individual listing wrapper | Gazette groups |
| `.list-items` | List items container | Card groups |
| `.intro-text-wrapper` | Intro text outer wrapper | Welcome section |
| `.intro-text` | Intro text content | Welcome text |
| `.justicia` | Justice statue image | Decorative SVG |
| `.kozlonyszam-wrapper` | Gazette number wrapper | Each gazette card |
| `.kozlonszam-content` | Gazette content container | Card content |
| `.kozlonyszam-texts` | Gazette text elements | Card text area |
| `.kozlonyszam-secondary-intertactions` | Secondary action buttons | Card actions |
| `.gasette-link` | Gazette title link | Gazette links |

## Responsive Behavior

### Desktop (>991px)
- Two-column layout: 70% gazette listing, 30% sidebar
- Full-size justicia image (160px)
- Horizontal gazette card layout

### Tablet (768-991px)
- Single column layout
- Gazette listing takes full width
- Justicia image scaled to 100px
- Maintained card layout

### Mobile (<768px)
- Full-width layout
- Vertical card layout for gazette items
- Justicia image scaled to 80px
- Compact action buttons

### Tiny Screens (<479px)
- Further optimized spacing
- Justicia image scaled to 60px
- Full-width elements

## Usage in HTML

These classes are used extensively in `index.html`:

```html
<!-- Main Content -->
<section class="section body">
  <div class="container">
    <div class="flex-column content">
      
      <!-- Gazette Listing -->
      <div class="gasette-listing">
        <div class="flex-column listing">
          <div class="flex-column list-items">
            
            <!-- Gazette Card -->
            <div class="card">
              <div class="kozlonyszam-wrapper">
                <div class="kozlonszam-content">
                  <div class="kozlonyszam-texts">
                    <a href="#" class="gasette-link">
                      Magyar Közlöny 2025. évi 70. szám
                    </a>
                  </div>
                  <div class="kozlonyszam-secondary-intertactions">
                    <!-- Action links -->
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Callouts -->
      </div>
      
    </div>
  </div>
</section>

<!-- Decorative Image -->
<img src="src/images/justicia.svg" class="justicia" />

<!-- Intro Text -->
<div class="intro-text-wrapper">
  <div class="intro-text">
    <div class="h2 inverse">Üdvözöljük...</div>
    <div class="paragraph">...</div>
  </div>
</div>
```

## Compilation

SCSS compiled successfully with no errors:

```bash
npm run scss:dev
# ✅ Compiled successfully
# ✅ Cache busted
# ✅ No linter errors
```

## Verification

- ✅ All 30 homepage classes found in index.html
- ✅ Styles properly compiled to main.css
- ✅ No linting errors
- ✅ Component files cleaned up
- ✅ Documentation updated

## Next Steps (Optional)

Consider creating similar page-specific files for:
- `_segitseg.scss` - Help page specific styles
- `_rss.scss` - RSS page specific styles

## Files Modified

| File | Status | Changes |
|------|--------|---------|
| `src/scss/pages/_home.scss` | ✨ Created | New file with all homepage styles |
| `src/scss/layout/_container.scss` | ♻️ Updated | Removed homepage-specific classes |
| `src/scss/components/_search.scss` | ♻️ Updated | Removed intro text classes |
| `src/scss/components/_card.scss` | ♻️ Updated | Kept only generic card styles |
| `src/scss/components/_header.scss` | ♻️ Updated | Removed justicia image styles |
| `src/scss/main.scss` | ♻️ Updated | Added home page import |
| `src/scss/README.md` | 📝 Updated | Updated structure documentation |
| `src/scss/pages/README.md` | 📝 Updated | Added homepage documentation |

---

**Result:** Homepage styles are now properly organized, making the codebase more maintainable and scalable! 🎉

