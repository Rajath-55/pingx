import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
// import { v4 as uuidv4 } from 'uuid';
import { Server } from 'socket.io';
let users = 0;

// env variables from .env file
dotenv.config();
const port = process.env.PORT || 5500;

// initializing server and socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// setting the static folder
app.use(express.static('web-client/build/'));

// setting the socket handlers
io.on('connection', socket => {
	console.log('a new user has connected.');

	socket.broadcast.emit('new user', { usersInRoom: users++ });

	socket.on('disconnect', () => {
		socket.emit('disconnected', { usersInRoom: users-- });
		console.log('a user has disconnected.');
	});

	socket.on('new message', data => {
		socket.broadcast.emit('new message', data);
		console.log(data);
	});
});

server.listen(port, () => console.log(`Listening on PORT=${port}`));
