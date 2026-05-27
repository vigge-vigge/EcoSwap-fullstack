# EcoSwap Test Accounts & Mock Data

## Test User Accounts

All test accounts use the password: **`password123`**

| Name           | Email               | Location          | Items Posted |
| -------------- | ------------------- | ----------------- | ------------ |
| Sarah Johnson  | sarah@example.com   | San Francisco, CA | 4 items      |
| Michael Chen   | michael@example.com | New York, NY      | 4 items      |
| Emma Rodriguez | emma@example.com    | Austin, TX        | 4 items      |
| David Kim      | david@example.com   | Seattle, WA       | 3 items      |
| Lisa Anderson  | lisa@example.com    | Portland, OR      | 4 items      |

## Quick Login

1. Go to http://localhost:3000/login
2. Use any email from the table above
3. Password: `password123`

## Sample Items in Database

The database contains **19 realistic items** across all categories:

- **Furniture**: Coffee tables, bookshelves, office chairs, standing desk converters
- **Electronics**: Monitors, computers
- **Clothing**: Winter coats, clothing lots
- **Books**: Children's books, programming books
- **Sports**: Yoga equipment, camping gear, bike accessories
- **Home & Garden**: Kitchen appliances, plants, espresso machines
- **Toys**: Board games, play kitchens
- **Other**: Musical instruments

### Free Items

Several items are marked as free (isFree: true):

- Kids Books Collection
- Potted Snake Plant
- Bike Helmet & Lock Set
- Toddler Toys & Play Kitchen
- Women's Clothing Lot
- House Plants Bundle

## Mock Data Locations

### Backend

- **Database Seed**: `backend/prisma/seed.ts`
- **Run Seed**: `cd backend && npm run prisma:seed`

### Frontend

- **Mock Data File**: `frontend/src/data/mockItems.ts`
- Contains TypeScript interfaces and sample data for development

## Testing the App

### 1. Start Backend

```bash
cd backend
npm run dev
```

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

### 3. Test Login Flow

- Navigate to http://localhost:5173
- Click "Login" or "Sign Up"
- Use any test account credentials
- Browse items, post new items, view your items

### 4. Test API Endpoints

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sarah@example.com","password":"password123"}'
```

#### Get All Items

```bash
curl http://localhost:5000/api/items
```

#### Get Items by Location

```bash
curl "http://localhost:5000/api/items?location=San%20Francisco"
```

## Database Setup

If you haven't set up the database yet:

```bash
cd backend

# Create the database and run migrations
npm run prisma:migrate

# Seed the database with mock data
npx prisma db seed

# View data in Prisma Studio (optional)
npm run prisma:studio
```

## Environment Variables

Make sure `backend/.env` has:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecoswap"
JWT_SECRET="ecoswap-secret-key-2024-change-in-production"
PORT=5000
NODE_ENV=development
```

Update the `DATABASE_URL` with your PostgreSQL credentials if different.
