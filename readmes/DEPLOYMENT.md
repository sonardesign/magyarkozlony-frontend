# Deployment Guide - Vercel

## Quick Deployment

Your project is now configured for Vercel deployment! ✅

### Prerequisites
- Vercel account (free: https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to Git
```bash
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

### Step 2: Import Project to Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your repository
4. Vercel will automatically detect the configuration!

### Step 3: Deploy
- Click **"Deploy"**
- Wait ~1-2 minutes
- Your site is live! 🎉

---

## Option 2: Deploy via Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy
```bash
# First time (will ask configuration questions)
vercel

# Production deployment
vercel --prod
```

---

## Configuration Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": null,
  "devCommand": "npm run dev"
}
```

### `package.json` (build script)
```json
{
  "scripts": {
    "build": "npm run scss:build && npm run cache-bust && node build.js"
  }
}
```

---

## Build Process

When you deploy, Vercel will:

1. ✅ Run `npm install` to install dependencies
2. ✅ Run `npm run build` which:
   - Compiles SCSS to compressed CSS
   - Updates cache-busting timestamps
   - Copies all files to `dist/` folder
3. ✅ Deploys the `dist/` folder

---

## What Gets Deployed

### ✅ Included in `dist/`:
- `index.html`, `tanusitvanyok.html`, `segitseg.html`, `rss.html`
- `src/css/main.css` (compiled, minified)
- `src/fonts/` (remixicon font)
- `src/images/` (all images)
- `src/js/` (all JavaScript)

### ❌ Excluded from `dist/`:
- `src/scss/` (SCSS source files)
- `src/styles-legacy/` (old styles)
- `*.map` (source map files)
- `node_modules/`
- Documentation files

---

## Environment Variables

If you need environment variables:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add your variables
4. Redeploy

---

## Custom Domain

1. Go to Vercel project dashboard
2. Settings → Domains
3. Add your domain
4. Update DNS records as instructed

---

## Troubleshooting

### Build fails on Vercel?
Check the build logs:
1. Go to Deployments tab
2. Click on the failed deployment
3. Check the build logs

### Common issues:

**Missing dependencies:**
```bash
# Make sure package.json lists all dependencies
npm install --save sass
```

**Build command fails:**
```bash
# Test locally first
npm run build
```

**Wrong output directory:**
```bash
# Verify dist/ folder exists after build
ls -la dist/
```

---

## Local Testing of Production Build

Test the production build locally before deploying:

```bash
# Build for production
npm run build

# Preview the dist folder
cd dist
python -m http.server 8000
# Or use any static file server
```

Open http://localhost:8000 in your browser.

---

## Deployment URL

After deployment, Vercel provides:
- **Production URL**: `your-project.vercel.app`
- **Preview URLs**: Automatic for every commit
- **Custom domain**: Configure in settings

---

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to any other branch

---

## Performance Optimization

Your build already includes:
- ✅ Minified CSS (no source maps)
- ✅ Optimized assets
- ✅ Cache-busting timestamps
- ✅ Only production files

---

## Commands Reference

```bash
# Build for production
npm run build

# Start development server
npm run dev

# Preview production build
npm run preview

# Deploy to Vercel
vercel
vercel --prod
```

---

## Support

- 📚 Vercel Docs: https://vercel.com/docs
- 💬 Vercel Community: https://github.com/vercel/vercel/discussions
- 🐛 Issues: Check build logs in Vercel dashboard

---

**Ready to deploy!** 🚀

Push your code and import to Vercel, or run `vercel` from the command line.

