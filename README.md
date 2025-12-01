# Rating-Based App

A full-stack application for rating stores with role-based access control.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **Containerization**: Docker & Docker Compose

## Features

### Roles
1. **Admin**: Manage users, stores, view dashboard
2. **Normal User**: Signup, login, rate stores, view stores
3. **Store Owner**: View ratings for their stores, view dashboard

### Validations
- Name: 20-60 characters
- Address: max 400 characters
- Password: 8-16 characters, 1 uppercase, 1 special character
- Email: valid format

## Project Structure

```
Rating-Based-App/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   └── Dockerfile
│
├── backend/           # Express API
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── sockets/
│   └── Dockerfile
│
└── docker-compose.yml
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   cd Rating-Based-App
   ```

2. **Create environment file**
   ```bash
   # Backend .env
   cd backend
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start services**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec backend npx prisma migrate dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Local Development

#### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and JWT secret
   ```

3. **Setup Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start dev server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/password` - Update password (protected)

### Users
- `GET /api/users/profile` - Get current user profile (protected)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `POST /api/users` - Create user (admin only)

### Stores
- `GET /api/stores` - Get all stores (public)
- `GET /api/stores/:id` - Get store by ID (public)
- `POST /api/stores` - Create store (admin only)
- `PUT /api/stores/:id` - Update store (admin only)
- `DELETE /api/stores/:id` - Delete store (admin only)

### Ratings
- `POST /api/ratings` - Create/update rating (user/owner)
- `GET /api/ratings/my-ratings` - Get user's ratings (user/owner)
- `DELETE /api/ratings/:id` - Delete rating (user/owner)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats (admin only)

### Owner
- `GET /api/owner/dashboard` - Get owner dashboard (owner only)
- `GET /api/owner/stores/:storeId/ratings` - Get store ratings (owner only)

## Database Schema

- **User**: id, name, email, password, address, role, createdAt, updatedAt
- **Store**: id, name, email, address, ownerId, createdAt, updatedAt
- **Rating**: id, rating (1-5), userId, storeId, createdAt, updatedAt

## Development

### Running Migrations
```bash
# Backend
cd backend
npx prisma migrate dev

# Or with Docker
docker-compose exec backend npx prisma migrate dev
```

### Prisma Studio
```bash
# Backend
cd backend
npx prisma studio

# Or with Docker
docker-compose exec backend npx prisma studio
```

## Production Deployment

1. Update environment variables
2. Build frontend: `cd frontend && npm run build`
3. Update Dockerfiles for production
4. Use production database
5. Set secure JWT secret
6. Configure CORS properly

## License

MIT

