# 🚂 Deploy on Railway RIGHT NOW (10 Minutes)

## Why Railway Instead of Render?

- ✅ NO CACHE ISSUES
- ✅ Works immediately
- ✅ Easier setup
- ✅ Free $5/month credits

---

## Step-by-Step Instructions

### 1. Go to Railway

Visit: https://railway.app

Click **"Login"** → Sign in with GitHub

### 2. Create New Project

Click **"New Project"** → **"Deploy from GitHub repo"**

Select: **EcoSwap-fullstack**

### 3. Add PostgreSQL Database

After project creates, click **"+ New"** → **"Database"** → **"Add PostgreSQL"**

### 4. Configure Backend Service

Click on your backend service → **"Settings"** → Scroll down:

**Root Directory:**

```
backend
```

**Build Command:**

```
npm install && npm run build && npx prisma generate
```

**Start Command:**

```
npx prisma migrate deploy && npm start
```

### 5. Add Backend Environment Variables

Click **"Variables"** tab → Add these:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=8d9f7e6a5c4b3a2d1e0f9g8h7i6j5k4l3m2n1o0p9q8r7s6t5u4v3w2x1y0z
NODE_ENV=production
PORT=5000
```

(Leave FRONTEND_URL blank for now)

### 6. Generate Backend Domain

Click **"Settings"** → **"Networking"** → **"Generate Domain"**

Copy the URL (e.g., `https://ecoswap-backend-production.up.railway.app`)

### 7. Delete Frontend Service

Railway auto-detected both. Delete the frontend service:

- Click frontend service → Settings → Scroll to bottom → **"Delete Service"**

### 8. Deploy Frontend on Vercel

Go to: https://vercel.com

Click **"New Project"** → Import **EcoSwap-fullstack**

**Root Directory:** `frontend`

**Framework Preset:** Vite

**Environment Variable:**

```
VITE_API_URL=https://YOUR-RAILWAY-BACKEND-URL.up.railway.app
```

Click **"Deploy"**

### 9. Update Backend FRONTEND_URL

Copy your Vercel frontend URL (e.g., `https://ecoswap.vercel.app`)

Go back to Railway → Backend service → **"Variables"** → Add:

```
FRONTEND_URL=https://YOUR-VERCEL-URL.vercel.app
```

Service will auto-redeploy.

---

## ✅ DONE!

Test your backend: `https://YOUR-BACKEND-URL.up.railway.app/api/health`

Test your frontend: `https://YOUR-FRONTEND-URL.vercel.app`

---

## Why This Works

Railway has:

- ✅ No aggressive caching
- ✅ Automatic deployments on git push
- ✅ Logs that actually make sense
- ✅ PostgreSQL included
- ✅ Free tier ($5/month credits)

Render kept using old cached builds. Railway won't do that.

---

**START NOW. FORGET RENDER.**
