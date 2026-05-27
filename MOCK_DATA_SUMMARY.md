# 🎉 EcoSwap Mock Data & Test Accounts - Setup Complete!

## ✅ What's Been Added

### 1. Backend Mock Data (Database Seed)

**File**: `backend/prisma/seed.ts`

- **5 Test Users** with realistic profiles
- **19 Mock Items** across all categories
- Automated seeding via `npx prisma db seed`
- All users have password: `password123`

### 2. Frontend Mock Data (Fallback)

**File**: `frontend/src/data/mockItems.ts`

- Complete TypeScript interfaces matching backend
- Same 19 items as backend seed
- 5 test user profiles
- `testCredentials` export for easy reference

### 3. Smart Fallback System

The frontend **automatically uses mock data** when the backend isn't available:

- `ItemsPage.tsx` - Shows banner when using mock data
- `LoginPage.tsx` - Displays test accounts with click-to-fill
- No backend required for frontend development!

## 🧪 Test Accounts

All accounts use password: **`password123`**

| Name           | Email               | Location          | Items Posted |
| -------------- | ------------------- | ----------------- | ------------ |
| Sarah Johnson  | sarah@example.com   | San Francisco, CA | 4 items      |
| Michael Chen   | michael@example.com | New York, NY      | 4 items      |
| Emma Rodriguez | emma@example.com    | Austin, TX        | 4 items      |
| David Kim      | david@example.com   | Seattle, WA       | 3 items      |
| Lisa Anderson  | lisa@example.com    | Portland, OR      | 4 items      |

## 📦 Mock Items Overview

**Total**: 19 realistic items

### By Category

- **Furniture** (5): Coffee table, office chair, bookshelf, standing desk converter
- **Electronics** (1): Dell 24" monitor
- **Clothing** (2): Winter coat, women's clothing lot
- **Books** (2): Kids books collection, programming books
- **Sports** (4): Yoga mat, bike helmet & lock, camping tent
- **Home & Garden** (5): Kitchen mixer, espresso machine, snake plant, plants bundle
- **Toys** (2): Board games, play kitchen
- **Other** (1): Acoustic guitar

### By Condition

- **Like New** (5 items)
- **Good** (11 items)
- **Fair** (1 item)
- **New** (2 items)

### Pricing

- **Free Items** (6): Kids books, snake plant, bike gear, play kitchen, clothing lot, plants
- **For Sale** (13): $30 - $450 range

### By Location

- San Francisco, CA: 4 items
- New York, NY: 4 items
- Austin, TX: 4 items
- Seattle, WA: 3 items
- Portland, OR: 4 items

## 🚀 How to Use

### Option 1: With Database (Full Backend)

1. **Install PostgreSQL** (see `DATABASE_SETUP.md`)

2. **Run migrations and seed**:

   ```powershell
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

3. **Start servers**:

   ```powershell
   # Terminal 1
   cd backend
   npm run dev

   # Terminal 2
   cd frontend
   npm run dev
   ```

4. **Login**: http://localhost:5173/login
   - Email: sarah@example.com
   - Password: password123

### Option 2: Frontend Only (Mock Data)

1. **Just start the frontend**:

   ```powershell
   cd frontend
   npm run dev
   ```

2. **Browse items**: http://localhost:5173/items

   - You'll see a banner: "Using Mock Data"
   - All 19 items are available
   - Location filtering works

3. **View test accounts**: http://localhost:5173/login
   - Click "Show" to see all test accounts
   - Click any account to auto-fill credentials

## 📋 Files Modified/Created

### Backend

```
backend/
├── prisma/
│   └── seed.ts                 # ✨ NEW - Database seed with 5 users + 19 items
├── package.json                # ✏️ UPDATED - Added prisma.seed configuration
└── .env                        # ✏️ UPDATED - Database URL configured
```

### Frontend

```
frontend/
├── src/
│   ├── data/
│   │   └── mockItems.ts        # ✨ NEW - Mock data (19 items + test credentials)
│   ├── pages/
│   │   ├── ItemsPage.tsx       # ✏️ UPDATED - Mock data fallback + banner
│   │   └── LoginPage.tsx       # ✏️ UPDATED - Test accounts display
│   └── components/ui/
│       └── ItemCard.tsx        # ✏️ UPDATED - Allow null prices
```

### Documentation

```
root/
├── TEST_ACCOUNTS.md            # ✨ NEW - This file
├── DATABASE_SETUP.md           # ✨ NEW - PostgreSQL installation guide
├── check-setup.ps1             # ✨ NEW - Setup verification script
└── README.md                   # ✏️ UPDATED - Quick start guide
```

## 🧩 Mock Data Details

### Users Structure

Each user has:

- `id` (auto-generated UUID)
- `name` (realistic full name)
- `email` (example.com domain)
- `passwordHash` (bcrypt hashed "password123")
- `phone` (555 area code format)
- `location` (City, State format)

### Items Structure

Each item has:

- `id` (auto-generated UUID)
- `userId` (linked to user)
- `title` (descriptive, realistic)
- `description` (detailed, 2-3 sentences)
- `category` (Furniture, Electronics, etc.)
- `condition` (Like New, Good, Fair, New)
- `isFree` (boolean)
- `price` (null if free, otherwise $30-$450)
- `location` (matches user location)
- `imageUrl` (null - ready for image uploads)
- `createdAt` (auto-generated timestamp)

## 🎯 Testing Scenarios

### Scenario 1: Browse Items

1. Visit http://localhost:5173/items
2. See all 19 items in grid layout
3. Test location filter: "San Francisco"
4. Should show 4 items from Sarah

### Scenario 2: Test Login

1. Visit http://localhost:5173/login
2. Click "Show" under test accounts
3. Click "Sarah Johnson" to auto-fill
4. Click "Sign In"

### Scenario 3: View Item Details

1. From items page, click any item card
2. View full description
3. See seller contact info
4. Check price or "Free" badge

### Scenario 4: Backend Integration

1. Start backend with database seeded
2. Frontend automatically uses real API
3. No "Using Mock Data" banner
4. Login persists with JWT token

## 🔄 Updating Mock Data

### Add More Items

Edit `backend/prisma/seed.ts`:

```typescript
const items = [
  // ... existing items
  {
    userId: users[0].id,
    title: "New Item",
    description: "Description here",
    category: "Furniture",
    condition: "Good",
    isFree: false,
    price: 100,
    location: "San Francisco, CA",
    imageUrl: null,
  },
];
```

Then re-seed:

```powershell
cd backend
npx prisma db seed
```

### Add More Users

Edit `backend/prisma/seed.ts`:

```typescript
const users = await Promise.all([
  // ... existing users
  prisma.user.create({
    data: {
      name: "New User",
      email: "newuser@example.com",
      passwordHash: await bcrypt.hash("password123", 10),
      phone: "(555) 999-9999",
      location: "Los Angeles, CA",
    },
  }),
]);
```

## ✨ Features Enabled

### Authentication

- ✅ Working login/register
- ✅ JWT token generation
- ✅ Password hashing (bcrypt)
- ✅ Protected routes

### Items Management

- ✅ Browse all items
- ✅ Filter by location
- ✅ Filter by category
- ✅ View item details
- ✅ Create items (auth required)
- ✅ Edit own items (auth required)
- ✅ Delete own items (auth required)

### User Experience

- ✅ Responsive design
- ✅ Mock data fallback
- ✅ Test account helpers
- ✅ Loading states
- ✅ Error handling

## 📞 Support

If you need to:

- **Set up PostgreSQL**: See `DATABASE_SETUP.md`
- **Understand the project**: See `README.md`
- **Check prerequisites**: Run `.\check-setup.ps1`

## 🎊 You're All Set!

Your EcoSwap platform now has:

- ✅ 5 test user accounts (all with password: password123)
- ✅ 19 realistic mock items
- ✅ Frontend fallback (works without backend)
- ✅ Full backend seed script
- ✅ Test account auto-fill in login
- ✅ Complete documentation

**Next Step**: Visit http://localhost:5173 and start testing! 🚀
