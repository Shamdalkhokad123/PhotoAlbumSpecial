# 🚀 Photo Album Pro - Deployment Guide

Complete step-by-step deployment instructions for various hosting platforms.

---

## Table of Contents
1. [Netlify Deployment](#netlify-deployment)
2. [Vercel Deployment](#vercel-deployment)
3. [GitHub Pages](#github-pages)
4. [Firebase Hosting](#firebase-hosting)
5. [AWS S3 + CloudFront](#aws-s3--cloudfront)
6. [Heroku](#heroku)
7. [DreamHost / Shared Hosting](#dreamhost--shared-hosting)
8. [Docker Deployment](#docker-deployment)

---

## Netlify Deployment

### Method 1: GitHub Integration (Recommended)

**Step 1:** Push your project to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/photo-album-pro.git
git push -u origin main
```

**Step 2:** Sign up/Login to Netlify
- Go to https://netlify.com
- Click "Sign up"
- Choose "GitHub" as your provider
- Authorize Netlify to access your repositories

**Step 3:** Create new site from Git
- Click "New site from Git"
- Select your repository
- Leave build settings as default (Netlify will auto-detect)
- Click "Deploy site"

**Your site will be live in seconds!** ✨

### Method 2: Manual Upload (Drag & Drop)

**Step 1:** Sign up at Netlify
**Step 2:** Drag and drop your entire project folder onto Netlify
**Step 3:** Your site will be deployed instantly

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to your Netlify account
netlify login

# Deploy your site
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Vercel Deployment

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

1. Go to https://vercel.com
2. Click "Import Git Repository"
3. Enter your GitHub repo URL
4. Configure project (leave defaults)
5. Click "Deploy"

### Method 3: Vercel Dashboard

1. Sign up at https://vercel.com
2. Click "Add New Project"
3. Upload your project folder
4. Deploy

**Your Vercel URL:** `https://your-project-name.vercel.app`

---

## GitHub Pages

### Step 1: Create GitHub Repository

```bash
# Initialize git repo
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Photo Album Pro"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/photo-album-pro.git

# Push to main branch
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Click "Save"

### Step 3: Access Your Site

Your site will be available at: `https://YOUR_USERNAME.github.io/photo-album-pro`

**Note:** It may take 1-2 minutes to deploy after enabling Pages.

---

## Firebase Hosting

### Prerequisites
- Google Account
- Firebase Project

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Project

```bash
firebase init hosting
```

When prompted:
- Select "Use an existing project" or create new
- Public directory: `.` (current directory)
- Configure as SPA: `Yes`
- Overwrite index.html: `No`

### Step 4: Deploy

```bash
firebase deploy --only hosting
```

### Your Firebase URL
`https://your-project-name.web.app`

---

## AWS S3 + CloudFront

### Step 1: Create S3 Bucket

1. Go to AWS Console (https://console.aws.amazon.com)
2. Search for "S3"
3. Click "Create bucket"
4. Name: `photo-album-pro-yourdomain`
5. Uncheck "Block all public access"
6. Click "Create bucket"

### Step 2: Upload Files

```bash
# Install AWS CLI
npm install -g aws-cli

# Configure AWS credentials
aws configure

# Sync files to S3
aws s3 sync . s3://your-bucket-name --delete --include "*"
```

### Step 3: Set Bucket Policy

1. Click on your bucket
2. Go to "Permissions"
3. Click "Bucket Policy"
4. Add this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Step 4: Enable Static Website Hosting

1. Go to "Properties"
2. Click "Static website hosting"
3. Choose "Enable"
4. Index: `index.html`
5. Error: `index.html`
6. Save

### Step 5: Create CloudFront Distribution (Optional but Recommended)

1. Go to CloudFront
2. Click "Create Distribution"
3. Origin: Select your S3 bucket
4. Default Root Object: `index.html`
5. Create distribution
6. Your URL: `https://your-cloudfront-distribution.cloudfront.net`

---

## Heroku

### Prerequisites
- Heroku Account
- Heroku CLI installed

### Step 1: Create Heroku App

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-photo-album-app
```

### Step 2: Deploy

```bash
# Push to Heroku
git push heroku main

# Or if using a different branch
git push heroku YOUR_BRANCH:main
```

### Step 3: Access Your App

`https://your-photo-album-app.herokuapp.com`

---

## DreamHost / Shared Hosting

### Step 1: Upload Files via FTP/SFTP

1. Use FTP client (FileZilla, WinSCP)
2. Connect to your host
3. Upload all files to `public_html` directory

### Step 2: Configure .htaccess

The `.htaccess` file is already included. Make sure:
1. It's uploaded to `public_html` root
2. Mod_rewrite is enabled (usually is by default)
3. Contact host if it doesn't work

### Step 3: Set Index File

If needed, contact support and request:
- Set index document to `index.html`
- Enable MOD_REWRITE

---

## Docker Deployment

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "-p", "3000"]
```

### Step 2: Create .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
.vscode
.idea
.DS_Store
```

### Step 3: Build Docker Image

```bash
docker build -t photo-album-pro .
```

### Step 4: Run Container

```bash
docker run -p 3000:3000 photo-album-pro
```

### Step 5: Deploy to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag photo-album-pro yourusername/photo-album-pro:latest

# Push image
docker push yourusername/photo-album-pro:latest
```

---

## Performance Optimization

### 1. Minify Assets
```bash
npm install -g minify

minify index.html > index.min.html
```

### 2. Enable Compression
All deployment configs include gzip compression headers.

### 3. Cache Optimization
Static assets are cached for 1 year.
HTML is cached for 1 hour.

### 4. CDN Usage
- Netlify & Vercel: Automatic CDN
- AWS S3: Use CloudFront
- Firebase: Automatic CDN

---

## Monitoring & Analytics

### Add Google Analytics

Add this to `<head>` section of index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` with your Google Analytics ID.

---

## SSL/HTTPS

All recommended platforms (Netlify, Vercel, GitHub Pages) automatically provide SSL certificates. 

For shared hosting, you may need to:
1. Request free SSL from hosting provider
2. Or purchase SSL certificate

---

## Domain Configuration

### Point Custom Domain to Your Site

#### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS instructions

#### Vercel
1. Go to Project settings → Domains
2. Add domain
3. Update DNS records

#### GitHub Pages
1. Add `CNAME` file with your domain
2. Update DNS records at your registrar

---

## Troubleshooting

### 404 Errors
- Ensure `.htaccess` is in root
- Check `vercel.json` rewrites
- Verify `netlify.toml` redirects

### Blank Page
- Check browser console for errors
- Ensure index.html is in root
- Check MIME types are correct

### Performance Issues
- Enable compression (all configs do this)
- Use CDN (Netlify/Vercel)
- Minimize JS/CSS
- Optimize images

### Deployment Failed
- Check logs in deployment platform
- Verify all files are uploaded
- Check for circular dependencies

---

## Quick Checklist

- [ ] All files uploaded
- [ ] index.html in root directory
- [ ] .htaccess (for Apache servers)
- [ ] netlify.toml / vercel.json configured
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] Analytics setup (optional)
- [ ] Test in multiple browsers

---

## Need Help?

- **Netlify Support:** https://support.netlify.com
- **Vercel Support:** https://vercel.com/support
- **GitHub Pages:** https://pages.github.com
- **Firebase Support:** https://firebase.google.com/support

---

**Happy Deploying! 🚀**
