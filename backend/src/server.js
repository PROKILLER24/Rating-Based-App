// Entry point for the Express server
// Location: backend/src/server.js

const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');
const { connectDB } = require('./config/db');

const server = http.createServer(app);

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Start listening
    server.listen(PORT, () => {
      console.log(`🚀 API server listening on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
  });
});

startServer();

module.exports = server;


