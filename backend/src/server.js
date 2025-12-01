// Entry point for the Express server
const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

module.exports = server;


