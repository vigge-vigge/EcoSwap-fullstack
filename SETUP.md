# EcoSwap Setup Guide

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database running
3. **npm** or **yarn** package manager

## Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a database:
   ```sql
   CREATE DATABASE ecoswap;
   ```

3. Update `backend/.env` with your database credentials:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ecoswap"
   ```

### Option 2: Docker PostgreSQL (Quick Start)

```powershell
docker run --name ecoswap-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ecoswap -p 5432:5432 -d postgres
```

Then use:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecoswap"
```

## Installation Steps

### 1. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 2. Setup Database with Prisma

```powershell
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 3. Install Frontend Dependencies

```powershell
cd ..\frontend
npm install
```

## Running the Application

### Start Backend Server

```powershell
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

### Start Frontend Development Server

```powershell
cd frontend
npm run dev
```

Frontend will run on: http://localhost:3000

## Testing the API

### Health Check
```powershell
curl http://localhost:5000/api/health
```

### Register a User
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"location\":\"New York\"}'
```

## Common Issues

### Database Connection Error
```
Error: P1001: Can't reach database server at localhost:5432
```

**Solution:** Ensure PostgreSQL is running:
```powershell
# Check if PostgreSQL service is running
Get-Service postgresql*

# Or if using Docker
docker ps
```

### Port Already in Use

If ports 3000 or 5000 are in use:

**Backend:** Change `PORT` in `backend/.env`
**Frontend:** Change `port` in `frontend/vite.config.ts`

### TypeScript Errors in VS Code

If you see TypeScript errors after installation:

1. Reload VS Code window: Press `Ctrl+Shift+P` → "Developer: Reload Window"
2. Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

## Project Structure Overview

```
ecoswap/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── context/       # React Context (Auth)
│   │   └── layouts/       # Layout components
│   └── package.json
│
├── backend/           # Express + TypeScript + Prisma
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, upload, etc.
│   │   └── config/        # Database config
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
│
└── README.md
```

## Next Steps

1. ✅ Install dependencies (backend & frontend)
2. ✅ Setup PostgreSQL database
3. ✅ Run Prisma migrations
4. ✅ Start both servers
5. 🚀 Open http://localhost:3000 and start building!

## Development Tips

- **Backend hot reload:** Uses `nodemon` - saves trigger automatic restart
- **Frontend hot reload:** Uses Vite HMR - instant updates
- **Database GUI:** Use `npx prisma studio` to view/edit data
- **API Testing:** Use Postman, Thunder Client, or curl

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:pass@localhost:5432/ecoswap"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development
```

### Frontend
No environment file needed - API proxy configured in `vite.config.ts`

## Building for Production

### Backend
```powershell
cd backend
npm run build
npm start
```

### Frontend
```powershell
cd frontend
npm run build
# Serve the 'dist' folder with any static server
```

---

Happy coding! 🌱
