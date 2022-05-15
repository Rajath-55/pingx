import socketIOClient from 'socket.io-client';
import repl from 'repl';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const serverURL =
	process.env.NODE_ENV === 'production'
		? 'https://chat-app-server.herokuapp.com'
		: 'http://localhost:3000';

const socket = socketIOClient(serverURL);

socket.on('connect', () => {
	console.log(chalk.green('connected to server'));
});

socket.on('peepoo', console.log);

socket.on('disconnect', () => socket.emit('disconnect'));

repl.start({
	prompt: 'you: ',
	eval: cmd => {
		socket.emit('bruh', cmd);
	},
});
