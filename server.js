const express = require('express');
const uuid = require('uuid');
const { ExpressPeerServer } = require('peer');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuid.v4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        // socket.broadcast.emit('user-disconnected', peerId);
    });
    socket.on('join-room', (roomId, peerId) => {
        console.log('joined-room', roomId);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', peerId);
        // io.in(roomId).emit('user-connected', 'ssdfsdf');
    });
});

server.listen(5000, () => {
    console.log('Listening on port 5000..')
});