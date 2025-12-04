# How to Run the Backend Server

## Prerequisites

Before running the backend, you need:
1. ✅ Node.js installed (v18 or higher)
2. ✅ PostgreSQL database running
3. ✅ Database migrations completed

## Step-by-Step Instructions

### Step 1: Navigate to Backend Directory

```bash
cd Rating-Based-App/backend
```

### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

### Step 3: Set Up Database

**Option A: Using Docker (Easiest)**
```bash
# Start PostgreSQL in Docker
docker run --name rating-app-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rating_app -p 5432:5432 -d postgres:15-alpine

# Wait a few seconds for database to start, then run migrations
npx prisma migrate dev
```

**Option B: Using Local PostgreSQL**
1. Make sure PostgreSQL is installed and running
2. Create database: `CREATE DATABASE rating_app;`
3. Update `.env` file with your database credentials
4. Run migrations: `npx prisma migrate dev`

### Step 4: Check .env File

Make sure `backend/.env` file exists with:
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rating_app?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Step 5: Generate Prisma Client (if needed)

```bash
npx prisma generate
```

### Step 6: Start the Backend Server

**For Development (with auto-reload):**
```bash
npm run dev
```

**For Production:**
```bash
npm start
```

## Expected Output

When the server starts successfully, you should see:
```
✅ Database connected successfully
🚀 API server listening on port 5000
📝 Environment: development
```

## Verify Server is Running

1. **Check Health Endpoint:**
   - Open browser: http://localhost:5000/health
   - Should see: `{"status":"ok","timestamp":"..."}`

2. **Check Terminal:**
   - Should show "API server listening on port 5000"
   - No error messages

## Troubleshooting

### Error: "Database connection error"
- ✅ PostgreSQL is not running → Start PostgreSQL
- ✅ Database doesn't exist → Create it: `CREATE DATABASE rating_app;`
- ✅ Wrong DATABASE_URL → Check `.env` file
- ✅ Migrations not run → Run `npx prisma migrate dev`

### Error: "Port 5000 already in use"
- ✅ Another process is using port 5000
- ✅ Solution: Kill the process or change PORT in `.env`

### Error: "Cannot find module"
- ✅ Dependencies not installed → Run `npm install`
- ✅ Prisma client not generated → Run `npx prisma generate`

## Quick Start Commands

```bash
# 1. Navigate to backend
cd Rating-Based-App/backend

# 2. Install dependencies
npm install

# 3. Start database (Docker)
docker run --name rating-app-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rating_app -p 5432:5432 -d postgres:15-alpine

# 4. Run migrations
npx prisma migrate dev

# 5. Start server
npm run dev
```

## API Endpoints

Once running, the backend provides:
- `GET /health` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/stores` - Get all stores
- `POST /api/stores` - Create store (admin)
- `POST /api/ratings` - Create rating
- `GET /api/admin/dashboard` - Admin dashboard

Full API runs on: **http://localhost:5000**


