# Setup Guide - Rating Based App

## ✅ Completed Setup

1. **Frontend Enhancements:**
   - ✅ Tailwind CSS installed and configured
   - ✅ All components styled with modern UI
   - ✅ Admin panel with "Add User" and "Add Store" functionality
   - ✅ Beautiful, responsive design throughout

2. **Backend Setup:**
   - ✅ .env file created with default configuration
   - ✅ Prisma client generated
   - ✅ Dependencies installed

## 🚀 Next Steps to Get Started

### 1. Database Setup

You need PostgreSQL running. Choose one option:

#### Option A: Using Docker (Easiest)
```bash
# Start PostgreSQL in Docker
docker run --name rating-app-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rating_app -p 5432:5432 -d postgres:15-alpine
```

#### Option B: Install PostgreSQL Locally
1. Download and install PostgreSQL from https://www.postgresql.org/download/
2. Create a database named `rating_app`
3. Update the `.env` file in `backend/` with your credentials:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/rating_app?schema=public
   ```

### 2. Run Database Migrations

```bash
cd backend
npx prisma migrate dev
```

This will create all the necessary tables in your database.

### 3. Start Backend Server

The backend server should already be starting. If not, run:
```bash
cd backend
npm run dev
```

The backend will run on: **http://localhost:5000**

### 4. Start Frontend Server

Open a new terminal:
```bash
cd frontend
npm run dev
```

The frontend will run on: **http://localhost:5173**

## 📋 Admin Panel Features

### Admin Dashboard
- View total users, stores, and ratings
- Quick access to manage users and stores

### Add Users (Admin Only)
1. Go to Admin Dashboard → Users
2. Click "+ Add User" button
3. Fill in the form:
   - Name (20-60 characters)
   - Email
   - Password (8-16 chars, 1 uppercase, 1 special)
   - Address (optional, max 400 chars)
   - Role (USER, ADMIN, or OWNER)
4. Click "Create User"

### Add Stores (Admin Only)
1. Go to Admin Dashboard → Stores
2. Click "+ Add Store" button
3. Fill in the form:
   - Store Name (max 60 characters)
   - Email
   - Address (max 400 chars)
4. Click "Create Store"

## 🔑 Creating Your First Admin User

You need to create an admin user to access the admin panel. You can do this by:

1. **Using Prisma Studio** (Recommended):
   ```bash
   cd backend
   npx prisma studio
   ```
   - Open http://localhost:5555
   - Go to User model
   - Create a new user with role = ADMIN
   - Password must be hashed (use bcrypt)

2. **Or register as a normal user first**, then manually update the role in the database to ADMIN

3. **Or use the API directly** (if you have Postman/curl):
   ```bash
   # First, register a normal user
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin User Name Here","email":"admin@example.com","password":"Admin@123","address":"Admin Address"}'
   
   # Then update the role in database to ADMIN using Prisma Studio
   ```

## 🎯 Application Flow

### Normal User Flow:
1. Register → Login → Browse Stores → Rate Stores

### Store Owner Flow:
1. Admin creates user with OWNER role
2. Owner logs in → Views dashboard → Sees ratings for their stores

### Admin Flow:
1. Admin logs in → Dashboard → Manage Users → Manage Stores → View Statistics

## 🐛 Troubleshooting

### Network Error
- Make sure backend is running on port 5000
- Check that CORS is configured correctly
- Verify API URL in frontend: `http://localhost:5000/api`

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env file
- Verify database exists: `rating_app`

### Prisma Errors
- Run `npx prisma generate` again
- Run `npx prisma migrate dev` to set up database schema

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rating_app?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Frontend
The frontend automatically uses `http://localhost:5000/api` as the API URL.

## 🎨 UI Features

- Modern Tailwind CSS styling
- Responsive design (mobile-friendly)
- Color-coded ratings (green/yellow/red)
- Role badges (Admin/User/Owner)
- Loading states and error messages
- Smooth animations and transitions

## 📚 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/stores` - Get all stores
- `POST /api/stores` - Create store (admin only)
- `POST /api/ratings` - Create/update rating
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/users` - Create user (admin only)

For full API documentation, see the README.md file.


