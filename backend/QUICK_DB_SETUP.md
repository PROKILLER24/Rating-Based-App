# Quick Database Setup Guide

## Problem
You're getting: "Authentication failed against database server - provided database credentials are not valid"

## Solution

### Option 1: Use the Setup Script (Easiest)

Run this PowerShell script:
```powershell
.\setup-database.ps1
```

It will:
- Check if PostgreSQL is running
- Ask for your database credentials
- Test the connection
- Create the database if needed
- Update your .env file automatically

### Option 2: Manual Setup

**Step 1: Find Your PostgreSQL Credentials**

Your PostgreSQL installation has a username and password. Common defaults:
- Username: `postgres`
- Password: The password you set during PostgreSQL installation

**Step 2: Create Database Manually**

Open pgAdmin or psql and run:
```sql
CREATE DATABASE rating_app;
```

**Step 3: Update .env File**

Edit `backend/.env` and update the DATABASE_URL:
```
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/rating_app?schema=public
```

Replace:
- `YOUR_USERNAME` with your PostgreSQL username (usually `postgres`)
- `YOUR_PASSWORD` with your PostgreSQL password

**Step 4: Run Migrations**
```bash
npx prisma migrate dev
```

**Step 5: Start Server**
```bash
npm run dev
```

### Option 3: Reset PostgreSQL Password (If You Forgot)

If you forgot your PostgreSQL password:

1. **Using pgAdmin:**
   - Open pgAdmin
   - Right-click on your server → Properties
   - Change password in Connection tab

2. **Using psql:**
   ```sql
   ALTER USER postgres WITH PASSWORD 'newpassword';
   ```

3. **Using Windows Services:**
   - Stop PostgreSQL service
   - Edit `pg_hba.conf` to allow local connections without password temporarily
   - Restart service, change password, then revert pg_hba.conf

### Option 4: Use Different User

If you have another PostgreSQL user, you can use that:

1. Update `.env`:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/rating_app?schema=public
   ```

2. Make sure that user has permission to create databases or the database already exists

## Verification

After setup, test the connection:
```bash
# Test with psql
psql -U postgres -h localhost -p 5432 -d rating_app -c "SELECT 1;"
```

If this works, your credentials are correct!

## Common Issues

**"password authentication failed"**
- Wrong password → Use the password you set during PostgreSQL installation
- Wrong username → Usually `postgres`, but check your installation

**"database does not exist"**
- Run: `CREATE DATABASE rating_app;` in psql or pgAdmin

**"connection refused"**
- PostgreSQL service not running → Start it from Services (services.msc)

## Need Help Finding Your Password?

1. Check if you saved it during PostgreSQL installation
2. Try common defaults: `postgres`, `admin`, `password`, `root`
3. Use pgAdmin to check/change password
4. Reset password using pgAdmin or psql


