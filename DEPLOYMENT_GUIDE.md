# EcoSwap Deployment Guide

## Recommended: Railway (Easiest & Best for This Stack)

Railway provides free hosting with PostgreSQL, automatic HTTPS, and simple deployment.

### Prerequisites

- GitHub account
- Railway account (sign up at railway.app)

### Step 1: Prepare Your Repository

1. **Create `.gitignore` if not exists:**

```
node_modules/
.env
dist/
build/
uploads/*
!uploads/.gitkeep
*.log
.DS_Store
```

2. **Push code to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Railway

1. **Go to railway.app and sign in with GitHub**

2. **Create New Project → Deploy from GitHub repo**
   - Select your EcoSwap repository

3. **Add PostgreSQL Database:**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will create a database and provide connection string

4. **Configure Backend Service:**
   - Railway should auto-detect the backend
   - Click on backend service → Settings
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
5. **Add Environment Variables (Backend):**
   - Go to Variables tab
   - Add these variables:

   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-super-secret-jwt-key-change-this
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.railway.app
   ```

6. **Configure Frontend Service:**
   - Click "New" → "GitHub Repo" → Select same repo
   - Click on service → Settings
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npx serve -s dist -l 3000`
7. **Add Environment Variables (Frontend):**
   - Go to Variables tab

   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

8. **Run Database Migrations:**
   - Go to backend service → Settings → Deploy Triggers
   - Add custom start command: `npx prisma migrate deploy && npm start`

9. **Generate Domains:**
   - Click on each service → Settings → Generate Domain
   - Copy the URLs and update the environment variables above

### Step 3: Update Backend CORS

Before deploying, update your backend to allow your frontend domain:

**backend/src/app.ts** - Add your Railway frontend URL to CORS origins.

### Step 4: Deploy & Monitor

- Railway will automatically deploy on every push
- View logs in the Railway dashboard
- Monitor build and runtime logs for any issues

---

## Alternative: Render (Free Tier Available)

### Step 1: Create Render Account

Sign up at render.com

### Step 2: Deploy Database

1. **New → PostgreSQL**
   - Name: ecoswap-db
   - Database: ecoswap
   - User: ecoswap
   - Free tier
   - Copy the Internal Database URL

### Step 3: Deploy Backend

1. **New → Web Service**
   - Connect your GitHub repo
   - Name: ecoswap-backend
   - Root Directory: `backend`
   - Environment: Node
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - Start Command: `npm start`
   - Instance Type: Free
2. **Environment Variables:**
   ```
   DATABASE_URL=<paste-internal-database-url>
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   PORT=5000
   ```

### Step 4: Deploy Frontend

1. **New → Static Site**
   - Connect your GitHub repo
   - Name: ecoswap-frontend
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
2. **Environment Variables:**
   ```
   VITE_API_URL=https://ecoswap-backend.onrender.com/api
   ```

### Step 5: Update CORS

Add your Render frontend URL to backend CORS configuration.

---

## Alternative: Vercel (Frontend) + Railway (Backend + DB)

**Best for:** Production apps with high traffic

### Backend on Railway

Follow Railway steps above for backend + database only.

### Frontend on Vercel

1. **Import project from GitHub**
2. **Root Directory:** `frontend`
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Environment Variables:**
   ```
   VITE_API_URL=https://your-railway-backend.railway.app/api
   ```

---

## Post-Deployment Checklist

- [ ] Backend health check: `https://your-backend-url.railway.app/api/items`
- [ ] Frontend loads correctly
- [ ] Login/Register works
- [ ] Items display properly
- [ ] Image uploads work (configure cloud storage for production)
- [ ] Orders/payments function
- [ ] Messages work
- [ ] Update CORS in backend with production URLs
- [ ] Set strong JWT_SECRET
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring/logging
- [ ] Run `npx prisma studio` locally with production DATABASE_URL to seed data if needed

---

## Important Configuration Files Needed

### 1. Backend package.json - Add scripts:

```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "nodemon src/server.ts"
  }
}
```

### 2. Frontend - Update vite.config.ts for production:

The current config should work, but ensure proxy is only used in development.

### 3. Backend CORS - Update app.ts:

```typescript
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.railway.app",
  "https://your-custom-domain.com",
];
```

---

## Environment Variables Summary

### Backend (.env for local, Railway/Render for production)

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.railway.app
```

### Frontend (.env for local)

```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend (Railway/Render/Vercel for production)

```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

---

## Recommended: Railway

**Why Railway?**

- ✅ Simplest setup for your tech stack
- ✅ Built-in PostgreSQL
- ✅ Automatic HTTPS
- ✅ Free $5/month credits
- ✅ One platform for everything
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Great logging and monitoring

**Cost:** Free tier includes $5 monthly credits (enough for small projects)

---

## Need Help?

Common issues:

1. **Database connection fails:** Check DATABASE_URL format and network access
2. **CORS errors:** Ensure frontend URL is in backend CORS origins
3. **Build fails:** Check build commands and ensure all dependencies in package.json
4. **Prisma errors:** Run `npx prisma generate` before starting
5. **Port conflicts:** Use environment variable PORT in production
