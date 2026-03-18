import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('got a connection');

    socket.on('join', username => {
        socket.username = username;

        io.emit('msg', {
            user: 'System',
            text: username + ' has entered the chat'
        });
    });

    socket.on('msg', msg => {
        io.emit('msg', msg);
    });

    socket.on('disconnect', () => {
        io.emit('msg', {
            user: 'System',
            text: (socket.username || 'A user') + ' has left the chat'
        });
    });
});

server.listen(80);