# EcoSwap 🌱

A modern sustainability platform for exchanging, giving away, or selling unused items.

**⚠️ Important: Frontend requires backend connection** - Both servers must be running.

## 🚀 Quick Start

**First time setup?** See complete guide: [SETUP_AND_RUN.md](SETUP_AND_RUN.md)

### 1. Check Prerequisites

```powershell
.\check-setup.ps1
```

### 2. Install Dependencies

```powershell
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Set Up Database

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for PostgreSQL installation.

With PostgreSQL running:

```powershell
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Start Development Servers

**Both servers required!**

```powershell
# Terminal 1 - Backend (REQUIRED!)
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Login with Test Account

- Visit http://localhost:3000/login
- Click any test account button (e.g., "Sarah (SF)")
- Password auto-fills as: **password123**

See [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md) for all test accounts.

## ⚙️ Backend Connection

The frontend is configured to **always use the backend API**:

- API proxy configured in `vite.config.ts`
- All requests go to `/api/*` → `http://localhost:5000/api/*`
- **No mock data fallback** - backend must be running
- Items are loaded directly from PostgreSQL database

### Verify Connection

```powershell
# Test API endpoint
curl http://localhost:5000/api/items

# Check backend logs - should see:
# 🚀 Server running on port 5000
```

## 🧪 Test Accounts & Mock Data

**5 Test Users** (all with password `password123`):

- sarah@example.com (San Francisco, CA)
- michael@example.com (New York, NY)
- emma@example.com (Austin, TX)
- david@example.com (Seattle, WA)
- lisa@example.com (Portland, OR)

**19 Mock Items** across all categories (furniture, electronics, books, sports, etc.)

## ✨ Features

- ✅ User authentication (JWT)
- ✅ Browse & filter items by location/category
- ✅ Post items (free or for sale)
- ✅ View item details with seller info
- ✅ Manage your listings
- ✅ Responsive design
- ✅ Mock data fallback (works without backend)

## 🛠️ Tech Stack

### Frontend

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT Authentication
- Multer for uploads

## 📁 Project Structure

```
ecoswap/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth context
│   │   ├── data/         # Mock data (fallback)
│   │   └── layouts/      # Layout components
│   └── package.json
│
├── backend/              # Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Auth, upload, errors
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.ts       # Mock data seed
│   └── package.json
│
├── DATABASE_SETUP.md     # Database setup guide
├── TEST_ACCOUNTS.md      # Test credentials
└── README.md
```

## 🔧 Scripts

### Frontend

```powershell
npm run dev      # Development server
npm run build    # Production build
```

### Backend

```powershell
npm run dev              # Development with nodemon
npm run build            # Compile TypeScript
npm run prisma:migrate   # Run migrations
npx prisma db seed       # Seed mock data
npx prisma studio        # Database GUI
```

## 🌐 API Endpoints

### Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Items

- `GET /api/items` - Get all items (supports ?location, ?category)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (auth required)
- `PUT /api/items/:id` - Update item (auth required)
- `DELETE /api/items/:id` - Delete item (auth required)
- `GET /api/items/my-items` - Get user's items (auth required)

## ⚙️ Environment Variables

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecoswap"
JWT_SECRET="ecoswap-secret-key-2024-change-in-production"
PORT=5000
NODE_ENV=development
```

## 🐛 Troubleshooting

**Backend can't connect to database**

- Ensure PostgreSQL is running on port 5432
- Check DATABASE_URL credentials in `.env`
- See [DATABASE_SETUP.md](DATABASE_SETUP.md)

**Frontend shows "Using Mock Data"**

- Normal when backend isn't running
- Start backend with `cd backend; npm run dev`
- Frontend automatically falls back to mock data

**Login fails**

- Make sure backend is running
- Ensure database is seeded: `npx prisma db seed`
- Use test accounts from [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md)

## 📄 License

MIT

---

Built for sustainability and circular economy 🌍♻️
