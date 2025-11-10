# 🚀 Quick Start Guide

## Magyar Közlöny Frontend - Restructured Project

---

## 📁 Project Structure

```
magyarkozlony-frontend/
├── index.html                          ← Main site (open this!)
├── src/
│   ├── scss/                          ← Edit your styles here
│   │   ├── abstracts/                 • Variables, mixins
│   │   ├── base/                      • Fonts, typography
│   │   ├── components/                • UI components
│   │   ├── layout/                    • Containers, grid
│   │   └── main.scss                  • Main entry
│   ├── css/                           ← Compiled CSS (don't edit)
│   ├── images/                        ← All images
│   ├── fonts/                         ← Font files
│   ├── js/                            ← JavaScript
│   └── styles-legacy/                 ← Old SCSS (preserved)
└── package.json                       ← Build scripts
```

---

## ⚡ Quick Commands

### Start Development (Watch Mode)
```bash
npm run dev
```
SCSS auto-compiles when you save files!

### Build for Production
```bash
npm run build
```
Creates minified CSS

### Serve with Vite
```bash
npm run serve
```
Development server at http://localhost:5173

---

## ✏️ Common Tasks

### 1. Change Colors
Edit: `src/scss/abstracts/_variables.scss`
```scss
$color-primary: #1a1a1a;
$color-secondary: #6b7280;
```

### 2. Modify a Component
Edit files in: `src/scss/components/`
- `_button.scss` - Buttons
- `_card.scss` - Cards
- `_header.scss` - Header
- `_navigation.scss` - Navigation
- etc.

### 3. Update Layout
Edit: `src/scss/layout/_container.scss`

### 4. Add New Component
1. Create: `src/scss/components/_mycomponent.scss`
2. Import in `src/scss/main.scss`:
   ```scss
   @import 'components/mycomponent';
   ```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main HTML file |
| `src/scss/main.scss` | SCSS entry point |
| `src/scss/abstracts/_variables.scss` | Colors, spacing, z-index |
| `src/css/main.css` | Compiled CSS (auto-generated) |
| `package.json` | Build scripts |

---

## 🎨 SCSS Architecture

```
src/scss/
├── abstracts/          ← Variables, mixins, functions
├── base/               ← Reset, typography, fonts
├── vendors/            ← Webflow framework
├── layout/             ← Grid, containers, sections
├── components/         ← Individual UI components
└── main.scss           ← Imports everything
```

**Order matters!** Variables must be imported before they're used.

---

## 🔄 Workflow

1. **Run watch mode:**
   ```bash
   npm run dev
   ```

2. **Edit SCSS files:**
   - Change variables in `src/scss/abstracts/_variables.scss`
   - Modify components in `src/scss/components/`
   - Update layout in `src/scss/layout/`

3. **Save file:**
   - SCSS auto-compiles to `src/css/main.css`

4. **Refresh browser:**
   - See your changes!

---

## 📦 Dependencies

```json
{
  "sass": "^1.69.5",      // SCSS compiler
  "vite": "^5.0.8"        // Dev server (optional)
}
```

Install with:
```bash
npm install
```

---

## 🎯 What's Where?

### Need to change...
- **Colors?** → `src/scss/abstracts/_variables.scss`
- **Button styles?** → `src/scss/components/_button.scss`
- **Header layout?** → `src/scss/components/_header.scss`
- **Footer?** → `src/scss/components/_footer.scss`
- **Container width?** → `src/scss/layout/_container.scss`
- **Typography?** → `src/scss/base/_typography.scss`
- **Fonts?** → `src/scss/base/_fonts.scss`

### Assets
- **Images:** `src/images/`
- **Fonts:** `src/fonts/`
- **JavaScript:** `src/js/`
- **Compiled CSS:** `src/css/`

---

## ⚠️ Important

### DO Edit:
- ✅ Any `.scss` files in `src/scss/`
- ✅ HTML in `index.html`
- ✅ Variables in `abstracts/_variables.scss`

### DON'T Edit:
- ❌ `src/css/main.css` (auto-generated)
- ❌ `src/css/main.css.map` (auto-generated)
- ❌ Files in `node_modules/`
- ⚠️ `src/styles-legacy/` (preserved old code)

---

## 🆘 Troubleshooting

### SCSS won't compile?
```bash
npm install
npm run dev
```

### Changes not showing?
1. Check that SCSS compiled (watch terminal)
2. Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
3. Clear browser cache

### Site looks broken?
1. Check browser console for errors
2. Verify paths in `index.html` point to `src/`
3. Ensure `src/css/main.css` exists

### Need old code?
Check `src/styles-legacy/` for original SCSS

---

## 📚 Full Documentation

- **PROJECT-MIGRATION-COMPLETE.md** - Complete migration details
- **SCSS-STRUCTURE.md** - SCSS architecture guide
- **HTML-STRUCTURE.md** - HTML documentation
- **README.md** - Full project overview

---

## 🎉 You're Ready!

```bash
# Start developing
npm run dev

# Open in browser
index.html

# Make changes
# Edit src/scss/
# Save & refresh!
```

**Happy coding! 🚀**

