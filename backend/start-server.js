// Startup script that checks database before starting server
const { PrismaClient } = require('@prisma/client');
const { DATABASE_URL } = require('./src/config/env');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n📋 To fix this:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Create a database named "rating_app"');
    console.error('3. Update DATABASE_URL in .env file');
    console.error('4. Run: npx prisma migrate dev');
    console.error('\n💡 Quick setup with Docker:');
    console.error('docker run --name rating-app-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rating_app -p 5432:5432 -d postgres:15-alpine\n');
    return false;
  }
}

async function start() {
  const dbConnected = await checkDatabase();
  
  if (!dbConnected) {
    console.error('\n⚠️  Server will not start without database connection.');
    console.error('Please set up the database first (see instructions above).\n');
    process.exit(1);
  }
  
  // Start the actual server
  require('./src/server.js');
}

start();


