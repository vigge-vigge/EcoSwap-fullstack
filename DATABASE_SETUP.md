# Database Setup Instructions

PostgreSQL is not currently running. You need to install and start PostgreSQL before the app can work.

## Option 1: Install PostgreSQL (Recommended)

### Windows Installation

1. **Download PostgreSQL**:
   - Visit https://www.postgresql.org/download/windows/
   - Download the installer (version 14 or higher recommended)
   - Run the installer

2. **During Installation**:
   - Set a password for the `postgres` user (remember this!)
   - Default port: `5432` (keep this)
   - Install pgAdmin (optional but helpful for viewing data)

3. **After Installation**:
   - PostgreSQL should start automatically
   - Open pgAdmin or use command line to verify it's running

4. **Create the Database**:

   ```powershell
   # Open PowerShell and run:
   psql -U postgres
   # Enter your postgres password, then run:
   CREATE DATABASE ecoswap;
   \q
   ```

5. **Update Backend .env**:
   - Open `backend/.env`
   - Update the DATABASE_URL with your postgres password:

   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ecoswap"
   ```

6. **Run Migrations and Seed**:
   ```powershell
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

## Option 2: Use Docker (Alternative)

If you have Docker installed:

```powershell
# Run PostgreSQL in Docker
docker run --name ecoswap-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=ecoswap -p 5432:5432 -d postgres:14

# Wait a few seconds, then run migrations
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

## Option 3: Use SQLite (Quick Testing)

For quick testing without PostgreSQL:

1. **Update Prisma Schema**:
   - Open `backend/prisma/schema.prisma`
   - Change:
     ```prisma
     datasource db {
       provider = "sqlite"
       url      = env("DATABASE_URL")
     }
     ```

2. **Update .env**:

   ```
   DATABASE_URL="file:./dev.db"
   ```

3. **Run Migrations**:
   ```powershell
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

## Verify Setup

After setting up the database:

```powershell
# View your data
cd backend
npx prisma studio
```

This will open a web interface at http://localhost:5555 where you can see all your users and items.

## Start the Application

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Then visit http://localhost:3000

## Test Login Credentials

All users have the password: **`password123`**

- sarah@example.com
- michael@example.com
- emma@example.com
- david@example.com
- lisa@example.com

See TEST_ACCOUNTS.md for full details.
