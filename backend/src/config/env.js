// Environment configuration

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || '';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
};


