# 🚀 Complete Setup & Run Guide

This guide will help you set up and run the EcoSwap application with the backend connected.

## Prerequisites Installed?

Run the setup checker first:

```powershell
.\check-setup.ps1
```

## Step-by-Step Setup

### Step 1: Install PostgreSQL

**Windows:**

1. Download from https://www.postgresql.org/download/windows/
2. Run installer (recommended version: 14 or higher)
3. Set password for `postgres` user (remember this!)
4. Keep default port: 5432
5. Install pgAdmin (optional but helpful)

**Verify Installation:**

```powershell
# Check if PostgreSQL is running
Get-Service postgresql*
```

If not running:

```powershell
Start-Service postgresql-x64-14
```

### Step 2: Create Database

```powershell
# Open PostgreSQL command line
psql -U postgres

# Enter your postgres password, then:
CREATE DATABASE ecoswap;
\q
```

### Step 3: Configure Backend

1. **Update `.env` file** in `backend` folder:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ecoswap"
   JWT_SECRET="ecoswap-secret-key-2024-change-in-production"
   PORT=5000
   NODE_ENV=development
   ```
   ⚠️ Replace `YOUR_PASSWORD` with your PostgreSQL password!

### Step 4: Run Database Migrations & Seed

```powershell
cd backend

# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed with mock data (5 users + 19 items)
npx prisma db seed
```

**Expected Output:**

```
🌱 Starting database seed...
📝 Creating test users...
✅ Created 5 test users
📦 Creating mock items...
✅ Created 19 mock items
🎉 Database seeding completed!

📋 Test User Accounts:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Sarah Johnson
   Email: sarah@example.com
   Password: password123
   Location: San Francisco, CA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
...
```

### Step 5: Start Backend

```powershell
# In backend folder
npm run dev
```

**Expected Output:**

```
🚀 Server running on port 5000
📊 Environment: development
```

### Step 6: Start Frontend

Open a **new terminal**:

```powershell
cd frontend
npm run dev
```

**Expected Output:**

```
VITE v5.4.21  ready in 212 ms
➜  Local:   http://localhost:3000/
```

### Step 7: Test the Application

1. **Open Browser**: http://localhost:3000

2. **Test Login**:

   - Click "Login"
   - Click any test account button (e.g., "Sarah (SF)")
   - Password will auto-fill as `password123`
   - Click "Sign In"

3. **Browse Items**:

   - You should see 19 items loaded from the backend
   - Try filtering by location (e.g., "San Francisco")
   - Click any item to view details

4. **Post an Item**:
   - Click "Post an Item" from navbar
   - Fill in the form
   - Submit
   - Should appear in "My Items"

## Verify Backend Connection

### Method 1: Check Browser Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Browse items page
4. Should see request to `http://localhost:3000/api/items` with status 200

### Method 2: Test API Directly

```powershell
# Test login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"sarah@example.com","password":"password123"}'

# Test get items
curl http://localhost:5000/api/items
```

### Method 3: Check Console

- Frontend console should NOT show "Using mock data"
- Backend terminal should show API requests:
  ```
  GET /api/items 200
  ```

## Troubleshooting

### Backend Won't Start

**Error: "Can't reach database server at localhost:5432"**

- PostgreSQL not running
- Solution: `Start-Service postgresql-x64-14`

**Error: "Invalid DATABASE_URL"**

- Check `.env` file in backend folder
- Ensure password is correct
- Format: `postgresql://postgres:PASSWORD@localhost:5432/ecoswap`

### Frontend Shows Error

**"Failed to load items. Please ensure the backend is running."**

- Backend not started
- Solution: `cd backend; npm run dev`

**CORS Error**

- Backend should have CORS enabled (already configured)
- Restart backend server

### Database Issues

**Migration Failed**

```powershell
# Reset and try again
cd backend
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma db seed
```

**Check Database Contents**

```powershell
# Open Prisma Studio (database GUI)
cd backend
npx prisma studio
```

Opens at http://localhost:5555

## Quick Commands Reference

```powershell
# Check setup status
.\check-setup.ps1

# Backend
cd backend
npm run dev              # Start server
npx prisma studio        # View database
npx prisma db seed       # Re-seed data
npx prisma migrate dev   # Run migrations

# Frontend
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production

# Database
psql -U postgres         # PostgreSQL CLI
Get-Service postgresql*  # Check service status
Start-Service postgresql-x64-14  # Start PostgreSQL
```

## Test Accounts

All use password: **password123**

| Email               | Location          | Items |
| ------------------- | ----------------- | ----- |
| sarah@example.com   | San Francisco, CA | 4     |
| michael@example.com | New York, NY      | 4     |
| emma@example.com    | Austin, TX        | 4     |
| david@example.com   | Seattle, WA       | 3     |
| lisa@example.com    | Portland, OR      | 4     |

## Success Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `ecoswap` created
- [ ] Backend `.env` configured with correct password
- [ ] Database migrated (`npx prisma migrate dev`)
- [ ] Database seeded with mock data (`npx prisma db seed`)
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can login with test account
- [ ] Items page shows 19 items from backend
- [ ] No error messages in browser console

## Next Steps

- ✅ Browse items from backend
- ✅ Login with test accounts
- ✅ Post new items
- ✅ Filter items by location
- ✅ View item details
- ✅ Manage your items

**You're all set!** 🎉

For more details:

- API documentation: See `README.md`
- Test data details: See `TEST_ACCOUNTS.md`
- Database schema: See `backend/prisma/schema.prisma`
