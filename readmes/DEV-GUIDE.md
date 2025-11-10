# Development Guide 🚀

## Quick Start

### Installation
```bash
npm install
```

### Development Mode
```bash
npm run dev
```

This will:
- ✅ Start Vite dev server on `http://localhost:3000`
- ✅ Watch SCSS files for changes and recompile automatically
- ✅ Auto-reload browser on changes (HMR - Hot Module Replacement)
- ✅ Serve with proper headers to prevent caching

## Development Features

### 1. **Live Reload & Hot Module Replacement (HMR)**
- Changes to HTML, CSS, and JS are instantly reflected in the browser
- No manual refresh needed
- Preserves application state when possible

### 2. **SCSS Watch Mode**
- Automatically compiles SCSS to CSS on save
- Generates source maps for easier debugging
- Shows compilation errors in terminal

### 3. **Cache Busting**
- Development server serves files with proper no-cache headers
- HTML includes cache control meta tags for development
- Force refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)

### 4. **Source Maps**
- SCSS source maps enabled in dev mode
- Easy debugging in browser DevTools
- See original SCSS file names and line numbers

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with SCSS watch |
| `npm run serve` | Start Vite dev server only |
| `npm run scss:watch` | Watch and compile SCSS only |
| `npm run scss:dev` | Compile SCSS once (development mode) |
| `npm run scss:build` | Compile SCSS for production (minified) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run clean` | Clean cache and build files |

## Troubleshooting Cache Issues

### Browser Cache
If you still see old styles:

1. **Hard Refresh**
   - Chrome/Edge: `Ctrl + Shift + R` or `Ctrl + F5`
   - Firefox: `Ctrl + Shift + R` or `Ctrl + F5`
   - Safari: `Cmd + Option + R`

2. **Clear Browser Cache**
   - Chrome DevTools → Network tab → Check "Disable cache" (keep DevTools open)
   - Or clear browsing data for the site

3. **Incognito/Private Mode**
   - Test in a private window to bypass cache completely

### CSS Not Updating

1. **Check SCSS compilation**
   ```bash
   npm run scss:dev
   ```
   Look for errors in terminal

2. **Check file changes**
   - Verify `src/css/main.css` was updated (check timestamp)
   - Check `src/css/main.css.map` exists

3. **Restart dev server**
   ```bash
   # Stop current dev server (Ctrl+C)
   npm run dev
   ```

4. **Clean and restart**
   ```bash
   npm run clean
   npm install
   npm run dev
   ```

### JavaScript Modules Not Loading

- Ensure you're using the dev server (not opening HTML directly)
- ES6 modules require HTTP server
- `file://` URLs don't support modules

## Development Best Practices

### 1. **Always Use Dev Server**
- ❌ Don't open `index.html` directly in browser
- ✅ Use `npm run dev` for proper module loading and HMR

### 2. **Keep DevTools Open**
- Enable "Disable cache" in Network tab
- Monitor console for errors
- Use source maps for debugging

### 3. **Watch Terminal Output**
- SCSS compilation errors appear here
- JavaScript errors from Vite
- HMR update notifications

### 4. **Test Responsive Design**
- Use Chrome DevTools Device Mode
- Test on actual devices when possible
- Breakpoints: 479px (tiny), 767px (small), 991px (medium), 1200px+ (large)

## File Structure

```
magyarkozlony-frontend/
├── index.html              # Main HTML file
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── src/
│   ├── css/               # Compiled CSS (auto-generated)
│   │   ├── main.css
│   │   └── main.css.map
│   ├── scss/              # Source SCSS files
│   │   ├── main.scss      # Main entry point
│   │   ├── abstracts/     # Variables, mixins, functions
│   │   ├── base/          # Reset, fonts, typography
│   │   ├── vendors/       # Third-party code
│   │   ├── layout/        # Layout components
│   │   └── components/    # UI components
│   ├── js/                # JavaScript modules
│   │   ├── app.js         # Main entry point
│   │   └── modules/       # Feature modules
│   ├── images/            # Images and SVGs
│   └── fonts/             # Web fonts
└── node_modules/          # Dependencies (auto-generated)
```

## Port Configuration

Default port: `3000`

To change port, edit `vite.config.js`:
```javascript
server: {
  port: 8080, // Your preferred port
}
```

## VS Code Tips

### Recommended Extensions
- **SCSS IntelliSense** - Syntax completion for variables
- **Live Sass Compiler** - Alternative SCSS compiler
- **Vite** - Vite-specific features
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting

### Workspace Settings
Already configured in `.vscode/settings.json`:
- SCSS validation enabled
- Auto-completion for SCSS modules
- File associations

## Performance Tips

### Development
- Source maps enabled for debugging
- Unminified code for readability
- Fast recompilation with Sass's incremental build

### Production
```bash
npm run build
```
- Minified CSS (no source maps)
- Optimized assets
- Ready for deployment

## Common Issues & Solutions

### Issue: "Module not found"
**Solution:** Ensure dev server is running, not opening file directly

### Issue: SCSS variables not recognized in IDE
**Solution:** Install "SCSS IntelliSense" extension, reload VS Code

### Issue: Changes not appearing
**Solution:** Hard refresh browser (Ctrl+Shift+R), check SCSS compiled without errors

### Issue: Port 3000 already in use
**Solution:** Stop other process or change port in `vite.config.js`

### Issue: Performance slow
**Solution:** Run `npm run clean` to clear Vite cache

## Getting Help

1. Check terminal output for errors
2. Check browser console for JavaScript errors
3. Verify file timestamps to ensure compilation happened
4. Try hard refresh or incognito mode
5. Clean and restart development server

---

**Happy Coding! 🎉**

