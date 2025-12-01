// Socket.io handlers for real-time rating updates (optional)

function registerRatingSocket(io) {
  io.on('connection', (socket) => {
    console.log('Client connected to rating socket');

    socket.on('new-rating', (payload) => {
      // Broadcast new rating to all connected clients
      io.emit('rating-updated', payload);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from rating socket');
    });
  });
}

module.exports = {
  registerRatingSocket,
};


