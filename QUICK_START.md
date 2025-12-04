# Quick Start Guide - Fix Registration Issue

## Problem
Registration is not working because the backend server cannot connect to the database.

## Solution - Choose One:

### Option 1: Use Docker (Easiest - Recommended)

1. **Start PostgreSQL Database:**
   ```bash
   docker run --name rating-app-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rating_app -p 5432:5432 -d postgres:15-alpine
   ```

2. **Run Database Migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```
   When prompted, name the migration: `init`

3. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `🚀 API server listening on port 5000`

4. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Test Registration:**
   - Go to http://localhost:5173
   - Click "Sign Up"
   - Fill in the form (name must be 20-60 characters, password must have uppercase and special character)
   - Click "Create Account"

### Option 2: Install PostgreSQL Locally

1. **Download PostgreSQL:**
   - Windows: https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql@15`
   - Linux: `sudo apt-get install postgresql`

2. **Create Database:**
   ```sql
   CREATE DATABASE rating_app;
   ```

3. **Update .env file:**
   Edit `backend/.env` and update DATABASE_URL:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/rating_app?schema=public
   ```

4. **Run Migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start Server:**
   ```bash
   npm run dev
   ```

## Verification Steps

1. **Check if database is running:**
   ```bash
   # For Docker
   docker ps | grep rating-app-db
   
   # For local PostgreSQL
   psql -U postgres -l
   ```

2. **Check if backend is running:**
   - Open browser: http://localhost:5000/health
   - Should see: `{"status":"ok","timestamp":"..."}`

3. **Check if frontend can connect:**
   - Open browser: http://localhost:5173
   - Try to register a new user
   - Should work without "Network Error"

## Common Issues

### "Network Error" in Frontend
- ✅ Backend server is not running → Start it with `npm run dev` in backend folder
- ✅ Database not connected → Set up database first (see above)
- ✅ Wrong API URL → Check `frontend/src/utils/api.js` (should be `http://localhost:5000/api`)

### "Database connection error"
- ✅ PostgreSQL not running → Start PostgreSQL
- ✅ Wrong DATABASE_URL → Check `.env` file
- ✅ Database doesn't exist → Create it: `CREATE DATABASE rating_app;`
- ✅ Migrations not run → Run `npx prisma migrate dev`

### "Validation Error" during registration
- ✅ Name must be 20-60 characters
- ✅ Password must be 8-16 characters with:
  - At least 1 uppercase letter (A-Z)
  - At least 1 special character (!@#$%^&*)
- ✅ Email must be valid format

## Test Registration Data

Use this example to test:
- **Name:** `John Doe Smith Johnson` (20+ characters)
- **Email:** `test@example.com`
- **Password:** `Test@1234` (has uppercase and special char)
- **Address:** `123 Main Street, City, State` (optional)

## Need Help?

1. Check backend terminal for error messages
2. Check browser console (F12) for network errors
3. Verify database is running: `docker ps` or `psql -U postgres -l`
4. Verify backend is running: http://localhost:5000/health


