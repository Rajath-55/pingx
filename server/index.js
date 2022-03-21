import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import * as socketio from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
// const io = socketio.createServer(server);

const port = process.env.PORT || 5500;

app.get('/', (req, res) => {
	const loc = req.headers.host;
	console.log(`Joined from:\n${loc}`);
	res.send('🤡👍');
});

server.listen(port, () => console.log(`Listening on PORT=${port}`));
