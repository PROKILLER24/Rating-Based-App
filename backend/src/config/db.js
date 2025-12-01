// Database connection using Prisma
// Location: backend/src/config/db.js

const { PrismaClient } = require('@prisma/client');
const { DATABASE_URL } = require('./env');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

async function disconnectDB() {
  await prisma.$disconnect();
  console.log('Database disconnected');
}

module.exports = {
  prisma,
  connectDB,
  disconnectDB,
};


