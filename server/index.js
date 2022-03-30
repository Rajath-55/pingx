import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
// import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { Server } from 'socket.io';

import Rooms from './src/Rooms.js';

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

// setting the static build folder
app.use(express.static('web-client/build/'));

const rooms = new Rooms();

// when a user makes a request to create a new room
app.get('/create', (req, res) => {
	const ID = rooms.makeNewRoom();
	console.log('created a new room with ID - ' + ID);
	res.send({ roomID: ID });
});

const getTimeStamp = () =>
	`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

// setting the socket handlers
io.on('connection', socket => {
	console.log('a new user has connected.');

	socket.on('join-room', data => {
		const { username, roomID } = data;

		socket.join(roomID);

		console.log(`${username} has joined the room ${roomID}`);
		const dt = {
			username: 'SERVER',
			message: `${username} has joined the room.`,
			timeStamp: getTimeStamp(),
		};
		socket.to(roomID).emit('receive-message', dt);

		socket.on('send-message', data => {
			socket.to(roomID).emit('receive-message', data);
			console.log(
				`${roomID}\n\t${data.timeStamp} ${data.username}: ${data.message}`,
			);
		});

		socket.on('disconnect', () => {
			socket.to(roomID).emit('receive-message', {
				username: 'SERVER',
				message: `${username} has left the room.`,
				timeStamp: getTimeStamp(),
			});
			socket.leave(roomID);
		});
	});
});

server.listen(port, () => console.log(`Listening on PORT=${port}`));
