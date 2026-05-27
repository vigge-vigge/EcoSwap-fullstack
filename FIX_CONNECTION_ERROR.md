# Quick Fix for Connection Errors

## The Problem

PostgreSQL service is **stopped**. The backend cannot connect to the database.

## Quick Solution

### Option 1: Start PostgreSQL (Requires Admin)

**Open PowerShell as Administrator** (right-click → Run as Administrator):

```powershell
Start-Service postgresql-x64-17
```

Then verify:

```powershell
Get-Service postgresql-x64-17
# Should show "Running"
```

### Option 2: Start via Services App

1. Press `Win + R`
2. Type: `services.msc` and press Enter
3. Find "postgresql-x64-17"
4. Right-click → Start

### Option 3: Use pg_ctl (if installed in PATH)

```powershell
pg_ctl -D "C:\Program Files\PostgreSQL\17\data" start
```

## After Starting PostgreSQL

The backend should automatically reconnect. Refresh your browser:

- http://localhost:3000/items

If you still see errors, restart the backend:

```powershell
# In backend terminal (Ctrl+C to stop, then)
npm run dev
```

## Verify It's Working

Test the API:

```powershell
curl http://localhost:5000/api/items
# Should return JSON array of items (not error message)
```

## Make PostgreSQL Start Automatically

To prevent this in the future:

1. Open `services.msc`
2. Find "postgresql-x64-17"
3. Right-click → Properties
4. Set "Startup type" to "Automatic"
5. Click OK

Now PostgreSQL will start automatically when Windows starts.

## Still Having Issues?

Check if the database exists:

```powershell
psql -U postgres -c "\l" | findstr ecoswap
```

If not found, create it:

```powershell
psql -U postgres -c "CREATE DATABASE ecoswap;"
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```
