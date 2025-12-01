// Database connection placeholder
// Wire this up with Prisma, Sequelize, or your preferred ORM

const { DATABASE_URL } = require('./env');

async function connectDB() {
  console.log('Connecting to database at', DATABASE_URL || '(not set)');
  // TODO: Initialize your DB/ORM client here
}

module.exports = {
  connectDB,
};


