const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes');
const socketHandler = require('./socket');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cool_website', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/api', routes);

// Socket.io
io.on('connection', socket => {
    socketHandler(io, socket);
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
