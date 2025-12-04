# Quick Fix - Start Backend Now!

## The Problem
Your `.env` file has wrong PostgreSQL password. You need to update it with YOUR actual PostgreSQL password.

## Quick Solution (Choose One):

### Method 1: Update .env File Manually

1. **Open `backend/.env` file**

2. **Find this line:**
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rating_app?schema=public
   ```

3. **Replace `postgres:postgres` with your actual credentials:**
   ```
   DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/rating_app?schema=public
   ```
   
   Example:
   ```
   DATABASE_URL=postgresql://postgres:MyPassword123@localhost:5432/rating_app?schema=public
   ```

4. **Create the database** (if it doesn't exist):
   - Open **pgAdmin** (PostgreSQL GUI tool)
   - Connect to your server
   - Right-click "Databases" → Create → Database
   - Name: `rating_app`
   - Click Save

   OR use psql:
   ```bash
   psql -U postgres
   # Then type: CREATE DATABASE rating_app;
   # Then type: \q to exit
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Start server:**
   ```bash
   npm run dev
   ```

### Method 2: Use the Setup Script

Run this in PowerShell:
```powershell
.\setup-database.ps1
```

It will ask for your credentials and set everything up automatically.

### Method 3: Find Your PostgreSQL Password

**If you forgot your password:**

1. **Open pgAdmin** (usually in Start Menu)
2. **Connect to your PostgreSQL server**
3. **Right-click on server → Properties**
4. **Check the Connection tab** - password might be saved there
5. **Or reset it:**
   - Right-click on server → Properties → Change Password
   - Set a new password
   - Update `.env` file with new password

## After Fixing .env:

```bash
# 1. Create database (if not exists)
# Use pgAdmin or: psql -U postgres -c "CREATE DATABASE rating_app;"

# 2. Run migrations
npx prisma migrate dev

# 3. Start server
npm run dev
```

## Still Not Working?

Try these common passwords:
- `postgres`
- `admin`  
- `password`
- `root`
- `123456`
- (empty/no password)

Or check your PostgreSQL installation notes/documentation.


