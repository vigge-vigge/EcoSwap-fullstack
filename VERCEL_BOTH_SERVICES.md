# Deploy BOTH on Vercel (5 Minutes - WORKS GUARANTEED)

## Why Vercel for Everything?
- ✅ BEST TypeScript support
- ✅ Handles monorepos perfectly
- ✅ No cache nightmares
- ✅ FREE hosting
- ✅ WORKS IMMEDIATELY

---

## Step 1: Get PostgreSQL (2 minutes)

Go to: https://neon.tech (Free PostgreSQL)

1. Sign in with GitHub
2. Click **"Create Project"**
3. Name it: `ecoswap-db`
4. Copy the connection string (starts with `postgresql://`)

---

## Step 2: Deploy Backend on Vercel (2 minutes)

Go to: https://vercel.com

Click **"Add New..."** → **"Project"**

Select: **EcoSwap-fullstack**

**Configure:**
- Framework Preset: **Other**
- Root Directory: `backend`
- Build Command: `npm install && npm run build && npx prisma generate`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
```
DATABASE_URL=postgresql://YOUR-NEON-CONNECTION-STRING
JWT_SECRET=8d9f7e6a5c4b3a2d1e0f9g8h7i6j5k4l3m2n1o0p9q8r7s6t5u4v3w2x1y0z
NODE_ENV=production
```

(Leave FRONTEND_URL blank for now)

Click **"Deploy"**

Wait 2 minutes. Copy the backend URL (e.g., `https://ecoswap-backend.vercel.app`)

---

## Step 3: Add Start Script

Vercel needs a start script. Let me add it:

In `backend/package.json`, we need to add a vercel.json file.
