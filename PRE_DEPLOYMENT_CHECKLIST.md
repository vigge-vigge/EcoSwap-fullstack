# Pre-Deployment Checklist

## ✅ Code Ready

- [x] Backend CORS configured for production URLs
- [x] Frontend API calls use centralized config
- [x] Environment variables documented (.env.example files)
- [x] TypeScript compiles without errors
- [x] Production build scripts in package.json

## ✅ Configuration Files

- [x] `.gitignore` excludes sensitive files
- [x] `railway.json` configs created
- [x] `render.yaml` configs created (alternative)
- [x] Database migrations ready

## ✅ Security

- [ ] Change JWT_SECRET to a strong random value (min 32 chars)
- [ ] Ensure .env is in .gitignore
- [ ] Review CORS allowed origins
- [ ] Set NODE_ENV=production in deployment

## ✅ Database

- [x] Prisma schema finalized
- [x] All migrations created
- [x] Seed data prepared (optional)

## ⚠️ Known Production Limitations

### File Uploads

**Current:** Files saved to local `uploads/` folder
**Issue:** Railway/Render use ephemeral storage (files deleted on redeploy)
**Solutions:**

1. **Quick Fix:** Use external image URLs for now
2. **Production Fix:** Integrate cloud storage:
   - **Cloudinary** (easiest, free tier available)
   - **AWS S3**
   - **DigitalOcean Spaces**

### Recommended: Integrate Cloudinary

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

Update `backend/src/middleware/upload.ts`:

```typescript
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecoswap",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
  },
});

export const upload = multer({ storage });
```

Add to backend environment variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Deployment Steps

### Before Deploying

1. Test locally one more time:

   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend (new terminal)
   cd frontend
   npm run dev
   ```

2. Verify everything works:
   - [ ] Login/Register
   - [ ] Browse items
   - [ ] Post new item
   - [ ] View item details
   - [ ] Send messages
   - [ ] Complete order/checkout
   - [ ] View my purchases/sales
   - [ ] Admin dashboard (if admin user)

3. Commit and push:
   ```bash
   git add .
   git commit -m "Production-ready: Updated API config and CORS"
   git push origin main
   ```

### Deploy

Follow instructions in [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) or [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📋 Post-Deployment Verification

After deploying, test these in production:

### Backend Health Check

```bash
curl https://your-backend.railway.app/api/health
```

Expected: `{"status":"OK","message":"EcoSwap API is running"}`

### Frontend Loads

Visit: `https://your-frontend.railway.app`

- [ ] Page loads without errors
- [ ] No CORS errors in browser console
- [ ] Items display on browse page

### Authentication

- [ ] Register new account
- [ ] Login with credentials
- [ ] JWT token stored
- [ ] Protected routes work

### Core Features

- [ ] Browse items
- [ ] View item details
- [ ] Post new item (may need cloud storage for images)
- [ ] View messages
- [ ] Complete checkout
- [ ] View order history

### Database

- [ ] Data persists after page reload
- [ ] Queries are fast (<500ms)
- [ ] No connection errors in logs

---

## 🐛 Common Deployment Issues

### Issue: "Failed to fetch items"

**Cause:** VITE_API_URL not set or incorrect
**Fix:** Check frontend environment variables in Railway/Render

### Issue: "CORS policy error"

**Cause:** Frontend URL not in backend CORS allowlist
**Fix:** Update FRONTEND_URL in backend environment variables

### Issue: "Database connection failed"

**Cause:** DATABASE_URL not set or incorrect
**Fix:** Verify DATABASE_URL in backend variables points to PostgreSQL service

### Issue: "Cannot POST /api/..."

**Cause:** Backend routes not loading
**Fix:** Check backend logs, ensure all route files exist

### Issue: "JWT malformed"

**Cause:** JWT_SECRET mismatch or not set
**Fix:** Set consistent JWT_SECRET in backend environment

### Issue: "Image upload fails"

**Cause:** Ephemeral storage on Railway/Render
**Fix:** Integrate Cloudinary (see above) or use external URLs

---

## 📊 Monitoring

### Railway Dashboard

- View logs in real-time
- Monitor CPU/memory usage
- Check deployment status
- View environment variables

### Application Logs

Look for these in backend logs:

- ✅ `Server running on port 5000`
- ✅ `Environment: production`
- ⚠️ Any error stack traces
- ⚠️ Database connection issues

### Frontend Browser Console

Check for:

- ❌ CORS errors → Fix FRONTEND_URL
- ❌ 404 on API calls → Check VITE_API_URL
- ❌ Network errors → Backend may be down
- ✅ Successful API responses

---

## 🎯 Success Criteria

Your deployment is successful when:

- [ ] Frontend loads at your Railway URL
- [ ] Backend API responds at `/api/health`
- [ ] Users can register and login
- [ ] Items are visible on browse page
- [ ] Database persists data
- [ ] No console errors
- [ ] HTTPS works (automatic on Railway)
- [ ] Application feels fast (<2s page loads)

---

## 📈 Next Steps After Deployment

1. **Share with users** - Get feedback on real usage
2. **Monitor performance** - Watch Railway dashboard
3. **Set up cloud storage** - For production-ready file uploads
4. **Add custom domain** - Make it professional
5. **Enable backups** - Protect your data
6. **Add analytics** - Understand user behavior
7. **Set up CI/CD** - Automate future deployments

---

## 💰 Cost Management

### Free Tier Monitoring

Railway provides $5/month free credits:

- Check usage in Railway dashboard
- Set up spending limits
- Optimize resource usage if needed

### Tips to Stay Free

- Use Railway's shared PostgreSQL
- Keep frontend/backend minimal
- Sleep services when not in use (Railway does this automatically)
- Consider Render's free tier as alternative

---

## 🆘 Need Help?

- **Railway Issues:** https://railway.app/help
- **Render Issues:** https://render.com/docs
- **Code Issues:** Check application logs
- **Database Issues:** Verify DATABASE_URL and run migrations

Good luck with your deployment! 🚀
