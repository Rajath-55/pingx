import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
// import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { Server } from 'socket.io';

let users = 0;

// env variables from .env file
dotenv.config();
const port = process.env.PORT || 5500;

// initializing server and socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

// safeguarding against CORS
app.use(cors());

// setting the static folder
app.use(express.static('web-client/build/'));

const getTimeStamp = () =>
	`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

// setting the socket handlers
io.on('connection', socket => {
	console.log('a new user has connected.');

	socket.broadcast.emit('new user', { usersInRoom: users++ });

	socket.on('disconnect', () => {
		socket.emit('disconnected', { usersInRoom: users-- });
		console.log('a user has disconnected.');
	});

	// socket.on('new message', data => {
	// 	socket.broadcast.emit('new message', data);
	// 	console.log(`${data.timeStamp} ${data.username}: ${data.message}`);
	// });

	socket.on('join-room', data => {
		const { username, roomID } = data;

		socket.join(roomID);

		console.log(`${username} has joined the room ${roomID}`);
		const dt = {
			username: 'SERVER',
			message: `${username} has joined the room.`,
			timeStamp: getTimeStamp(),
		};
		socket.to(roomID).emit('send-message', dt);

		socket.on('send-message', data => {
			socket.to(roomID).emit('receive-message', data);
			// socket.emit('receive-message', data);
			console.log(
				`${roomID}\n\t${data.timeStamp} ${data.username}: ${data.message}`,
			);
		});
	});
});

server.listen(port, () => console.log(`Listening on PORT=${port}`));
