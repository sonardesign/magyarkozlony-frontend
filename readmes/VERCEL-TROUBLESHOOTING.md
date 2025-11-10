# Vercel Deployment Troubleshooting

## Error: "no such file or directory" for SCSS

### Problem
```
Error reading src/scss/main.scss: no such file or directory.
Error: Command "npm run build" exited with 66
```

### Cause
The `.vercelignore` file was excluding `src/scss/` which prevented the SCSS files from being uploaded to Vercel during the build process.

### Solution ✅
**Updated `.vercelignore`** to NOT exclude files needed during build:

```
# .vercelignore

# Keep SCSS files (needed for build)
# Keep cache-bust.js (needed for build)
# Keep build.js (needed for build)

# Only exclude truly unnecessary files:
- node_modules/
- readmes/
- *.md
- .env files
- IDE files
```

### How It Works Now

1. **During Vercel Build:**
   - ✅ SCSS files are present
   - ✅ `npm run scss:build` compiles SCSS → CSS
   - ✅ `node build.js` creates `dist/` folder
   - ✅ SCSS files are excluded from `dist/` by `build.js`

2. **Final Deployment:**
   - ✅ Only `dist/` folder is deployed
   - ✅ Contains compiled CSS (not SCSS)
   - ✅ Production-ready files only

---

## Build Process Flow

```
┌─────────────────────────────────────┐
│  Vercel receives your code          │
│  (including SCSS files)             │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  npm install                        │
│  (installs sass compiler)           │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  npm run build                      │
│  ├─ npm run scss:build              │
│  │  └─ Compiles SCSS → CSS          │
│  ├─ npm run cache-bust              │
│  │  └─ Updates timestamps           │
│  └─ node build.js                   │
│     └─ Creates dist/ folder         │
│        (excludes SCSS)               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Vercel deploys dist/ folder        │
│  (no SCSS files included)           │
└─────────────────────────────────────┘
```

---

## Key Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### `package.json`
```json
{
  "scripts": {
    "build": "npm run scss:build && npm run cache-bust && node build.js"
  },
  "devDependencies": {
    "sass": "^1.69.5"
  }
}
```

### `build.js`
- Compiles everything to `dist/`
- Excludes `src/scss/` from output
- Excludes `src/styles-legacy/` from output
- Excludes `*.map` files from output

### `.vercelignore`
- Only excludes documentation and IDE files
- **Does NOT** exclude build dependencies

---

## Testing Locally

Before deploying to Vercel, always test:

```bash
# Clean previous build
rm -rf dist

# Run production build
npm run build

# Check dist folder
ls -la dist/
ls -la dist/src/

# Verify SCSS is NOT in dist
# Should see: css, js, images, fonts
# Should NOT see: scss, styles-legacy
```

---

## Common Vercel Build Errors

### Error: "Command exited with X"

**Check:**
1. Does `npm run build` work locally?
2. Are all dependencies in `package.json`?
3. Is `sass` listed in `devDependencies`?

**Fix:**
```bash
# Ensure sass is installed
npm install --save-dev sass

# Test build locally
npm run build
```

### Error: "Output directory not found"

**Check:**
1. Does `dist/` folder exist after build?
2. Is `vercel.json` configured correctly?

**Fix:**
```bash
# Verify dist folder is created
npm run build
ls dist/
```

### Error: "Module not found"

**Check:**
1. Are all npm packages in `package.json`?
2. Is `type: "module"` in `package.json`?

**Fix:**
```json
{
  "type": "module",
  "devDependencies": {
    "sass": "^1.69.5"
  }
}
```

---

## Vercel Build Logs

To debug build issues:

1. Go to your Vercel project
2. Click **Deployments** tab
3. Click on the failed deployment
4. Check the **Build Logs**

Look for:
- ❌ Red error messages
- ⚠️ Warning messages
- Exit codes (anything other than 0 is an error)

---

## Environment Differences

### Local Development
```bash
npm run dev
# - Uses watch mode
# - Includes source maps
# - Uses expanded CSS
```

### Production Build
```bash
npm run build
# - One-time build
# - No source maps
# - Compressed CSS
# - Excludes dev files
```

---

## Quick Checklist

Before deploying to Vercel:

- [ ] `npm run build` works locally
- [ ] `dist/` folder is created
- [ ] `dist/index.html` exists
- [ ] `dist/src/css/main.css` exists
- [ ] `dist/src/` does NOT contain `scss/`
- [ ] All dependencies in `package.json`
- [ ] `vercel.json` configured correctly
- [ ] `.vercelignore` doesn't exclude build files

---

## Success Indicators

When deployment works:

```
✓ Building
✓ Compiled successfully
✓ Deploying
✓ Deployment Ready
```

Your site will be live at:
- `https://your-project.vercel.app`

---

## Still Having Issues?

1. **Check Vercel Status**: https://vercel-status.com
2. **Vercel Docs**: https://vercel.com/docs
3. **Community Support**: https://github.com/vercel/vercel/discussions

Or share your build logs for help!

