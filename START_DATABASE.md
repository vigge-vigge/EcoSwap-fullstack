# Start PostgreSQL Database

## The Issue

The login is failing because the PostgreSQL database service is not running. The backend cannot connect to the database at `localhost:5432`.

## Solution

### Option 1: Start PostgreSQL Service (Recommended)

1. **Open PowerShell as Administrator**:

   - Right-click on PowerShell
   - Select "Run as Administrator"

2. **Start the PostgreSQL service**:

   ```powershell
   Start-Service postgresql-x64-17
   ```

3. **Verify it's running**:

   ```powershell
   Get-Service postgresql-x64-17
   ```

   You should see `Status: Running`

### Option 2: Start PostgreSQL via Services App

1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find `postgresql-x64-17` in the list
4. Right-click and select "Start"

### Option 3: Set PostgreSQL to Start Automatically

In PowerShell (as Administrator):

```powershell
Set-Service -Name postgresql-x64-17 -StartupType Automatic
Start-Service postgresql-x64-17
```

## After Starting PostgreSQL

1. **Push the database schema**:

   ```powershell
   cd c:\code\ecoswap\backend
   npx prisma db push
   ```

2. **Seed the database with test data**:

   ```powershell
   npx prisma db seed
   ```

3. **Restart the backend server**:

   - Stop the current backend server (Ctrl+C)
   - Start it again:

   ```powershell
   npm run dev
   ```

4. **Try logging in again** at http://localhost:3000/login

## Test Credentials

After seeding, you can use any of these accounts:

- Email: `sarah@example.com` / Password: `password123`
- Email: `michael@example.com` / Password: `password123`
- Email: `emma@example.com` / Password: `password123`
- Email: `david@example.com` / Password: `password123`
- Email: `lisa@example.com` / Password: `password123`
