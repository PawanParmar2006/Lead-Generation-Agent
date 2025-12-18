# Deployment Guide for BioLeadGen

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free tier available at vercel.com)

## Option 1: Deploy to Vercel (Recommended for Next.js)

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: BioLeadGen web agent"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name your repository (e.g., "bioleadgen-web-agent")
   - Choose public or private
   - DO NOT initialize with README (you already have code)
   - Click "Create repository"

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/bioleadgen-web-agent.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Method A: Deploy via Vercel Dashboard (Easiest)**

1. Go to https://vercel.com and sign up/login with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app` in 2-3 minutes

**Method B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Deploy to production
vercel --prod
```

### Step 3: Configure Environment Variables (If Needed)

If you add real API integrations later:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `LINKEDIN_API_KEY`
   - `PUBMED_API_KEY`
   - `OPENROUTER_API_KEY`
3. Redeploy to apply changes

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. Go to https://netlify.com and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and authorize
4. Select your repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Framework**: Next.js
6. Click "Deploy site"

---

## Option 3: GitHub Pages (Limited - Static Export Only)

**Note**: GitHub Pages requires static export and won't support API routes or server-side features.

### Step 1: Configure Next.js for Static Export

Add to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

### Step 2: Build and Deploy

```bash
# Build static site
npm run build

# GitHub Pages requires files in /docs or root
# Add this script to package.json:
"scripts": {
  "export": "next build && next export"
}

# Run export
npm run export
```

### Step 3: Push to GitHub

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/root`
   - Save

---

## Continuous Deployment

Once connected to Vercel or Netlify:

- **Every push to main** triggers automatic deployment
- **Pull requests** get preview deployments
- **No manual steps** required after initial setup

---

## Custom Domain (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### On Netlify:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Follow DNS configuration steps

---

## Troubleshooting

**Build fails on Vercel/Netlify:**
- Check build logs for missing dependencies
- Ensure `package.json` includes all required packages
- Verify Node.js version compatibility

**API routes not working:**
- GitHub Pages doesn't support API routes (use Vercel/Netlify)
- Check environment variables are set correctly

**Images not loading:**
- Ensure image paths start with `/` for absolute paths
- For static export, images must be in `/public` directory

---

## Quick Start Commands

```bash
# Local development
npm install
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build
npm start

# Deploy to Vercel
vercel --prod
```

---

## Recommended: Vercel Deployment

For this Next.js application with API routes and dynamic features, **Vercel** is the best choice because:

- Native Next.js support (created by the same team)
- Automatic deployments on git push
- Free tier includes custom domains and SSL
- Support for API routes and server-side rendering
- Built-in analytics and performance monitoring
- Edge network for global performance

Your live URL will be: `https://bioleadgen-web-agent.vercel.app`
