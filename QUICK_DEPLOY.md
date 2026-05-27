# EcoSwap - Quick Deploy to Railway

## Option 1: Deploy via Railway Dashboard (Recommended - 5 minutes)

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Set Up Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `ecoswap` repository
4. Railway will detect both frontend and backend

### 3. Add PostgreSQL Database

- Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
- Database will be created automatically with connection string

### 4. Configure Backend Service

Click on the backend service card:

**Settings Tab:**

- Root Directory: `backend`
- Custom Build Command: (leave empty, uses npm install)
- Custom Start Command: `npx prisma migrate deploy && npx prisma generate && npm start`

**Variables Tab - Add these:**

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-random-super-secret-key-at-least-32-characters-long
NODE_ENV=production
PORT=5000
FRONTEND_URL=${{frontend.url}}
```

**Generate Domain:**

- Go to Settings → Networking → Generate Domain
- Copy the URL (e.g., `https://ecoswap-backend-abc123.railway.app`)

### 5. Configure Frontend Service

Click on the frontend service card:

**Settings Tab:**

- Root Directory: `frontend`
- Custom Build Command: (leave empty, uses npm install && npm run build)
- Custom Start Command: `npx serve -s dist -l $PORT`

**Variables Tab - Add this:**

```
VITE_API_URL=https://YOUR-BACKEND-URL.railway.app
```

Replace with your actual backend URL from step 4.

**Generate Domain:**

- Go to Settings → Networking → Generate Domain
- Copy the URL (e.g., `https://ecoswap-abc123.railway.app`)

### 6. Update Backend FRONTEND_URL

- Go back to backend Variables tab
- Update `FRONTEND_URL` to your frontend Railway URL from step 5

### 7. Redeploy Both Services

- Click the three dots menu on each service → "Redeploy"
- Wait for builds to complete (2-3 minutes each)

### 8. Verify Deployment

- Open your frontend URL
- Check that items load
- Try registering and logging in
- Test creating an item

---

## Option 2: Deploy via Railway CLI (Advanced)

### Install Railway CLI

```bash
npm install -g @railway/cli
```

### Login

```bash
railway login
```

### Create Project

```bash
railway init
```

### Link Services

```bash
# In backend directory
cd backend
railway up

# In frontend directory
cd ../frontend
railway up
```

---

## Post-Deployment Setup

### 1. Seed Database (Optional)

Run this in Railway backend service terminal:

```bash
npx prisma db seed
```

### 2. Set Up Custom Domain (Optional)

In each service:

- Settings → Networking → Custom Domain
- Add your domain and follow DNS instructions

### 3. Enable HTTPS (Automatic)

Railway provides automatic HTTPS certificates.

---

## Environment Variables Reference

### Backend

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.railway.app
```

### Frontend

```env
VITE_API_URL=https://your-backend.railway.app
```

---

## Troubleshooting

### Build Fails

- Check logs in Railway dashboard
- Verify root directory is set correctly
- Ensure all dependencies in package.json

### Database Connection Error

- Verify DATABASE_URL is set
- Check Prisma migrations ran: `npx prisma migrate deploy`
- Ensure PostgreSQL service is running

### CORS Error

- Verify FRONTEND_URL in backend matches your frontend domain
- Check backend CORS configuration in app.ts

### API Not Found (404)

- Verify VITE_API_URL in frontend variables
- Check backend is running and healthy
- Test: `https://your-backend.railway.app/api/health`

### Images/Uploads Not Working

- Note: File uploads to local filesystem won't persist on Railway
- For production, use cloud storage (Cloudinary, AWS S3, etc.)
- Alternative: Use direct image URLs for now

---

## Cost Estimate

**Railway Free Tier:**

- $5 in credits per month
- 500 hours of usage
- Shared CPU and 512MB RAM per service

**Typical usage for EcoSwap:**

- Backend: ~$2/month
- Frontend: ~$1/month
- PostgreSQL: ~$1/month
- **Total: ~$4/month** (within free tier)

---

## Production Optimizations (Later)

1. **File Uploads:** Integrate Cloudinary or AWS S3
2. **Email:** Add SendGrid/Mailgun for notifications
3. **Monitoring:** Set up Sentry for error tracking
4. **Analytics:** Add Plausible or Google Analytics
5. **CDN:** Use Cloudflare for static assets
6. **Caching:** Add Redis for session management
7. **Backup:** Enable automated database backups

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check deployment logs in Railway dashboard
- Backend health check: `/api/health` endpoint
