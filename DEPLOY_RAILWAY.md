# 🚀 Deploy to Railway (Recommended)

Railway is the easiest way to deploy Node.js applications. Here's how to deploy Photo Album Pro:

## Prerequisites
- GitHub account (free)
- Railway account (free tier available)
- Project pushed to GitHub

## Step 1: Initialize Git and Push to GitHub

```bash
# Navigate to your project
cd PhotoAlbumEsha

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Photo Album Pro"

# Add remote (replace with your GitHub repo)
git remote add origin https://github.com/YOUR_USERNAME/photo-album-pro.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Railway

### Option A: Railway CLI (Fastest)

```bash
# Install Railway CLI (if not already installed)
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Deploy
railway up

# Get your public URL
railway open
```

Your app will be live in seconds!

### Option B: Web Dashboard (Easiest)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your GitHub repository
6. Railway will auto-detect the Node.js app
7. Click **"Deploy"**

That's it! Your URL will appear immediately.

## Step 3: Configure Environment (Optional)

In Railway Dashboard:
1. Go to your project
2. Click the **Variables** tab
3. Add these if needed:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`

## Step 4: Domain Setup (Optional)

Add a custom domain:
1. In Railway Dashboard → **Settings**
2. Click **"Add Custom Domain"**
3. Follow the DNS configuration steps
4. Your app will be live at your custom domain!

## Monitoring & Logs

View logs in real-time:
```bash
# Using CLI
railway logs

# Or in Dashboard
# Click your service → View "Logs" tab
```

## Redeploy

Railway automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main

# That's it! Railway detects the change and redeploys automatically
```

## Troubleshooting

### App won't start?
```bash
railway logs
# Check the error messages above
```

### Port issues?
The app runs on port 3000 internally, Railway handles external routing.

### Need to restart?
```bash
railway restart
```

### Want to see the app?
```bash
railway open
```

## Cost

- **Free Tier**: $5 credits/month (usually enough for testing)
- **Paid**: Pay-as-you-go pricing
- **Deployment**: FREE
- **Bandwidth**: Part of credits

## Need Help?

- Railway Docs: https://docs.railway.app
- Chat Support: Available in Railway Dashboard
- Community: https://discord.gg/railway

---

## Alternative: Deploy to Render

If you prefer Render, it's equally simple:

1. Push code to GitHub
2. Go to https://render.com
3. Sign up with GitHub
4. Click "New +"
5. Select "Web Service"
6. Connect your GitHub repo
7. Render will auto-detect Node.js
8. Click "Create Web Service"
9. Done! Your app is live at `https://[your-app].onrender.com`

---

Happy deploying! 🎉
