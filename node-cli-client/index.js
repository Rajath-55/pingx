import io from 'socket.io-client';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import axios from 'axios';
import dotenv from 'dotenv';
import ON_DEATH from 'death';

import { sleep, serverURL } from './src/utils.js';

dotenv.config();

const socket = io(serverURL);

let username = '',
	roomID = '';
let users = [];
let joiningMode = 'join room';

// currently doesn't work in Git Bash in Windows.
ON_DEATH(() => {
	console.log(chalk.bgGreen('goodbye'));
	socket.disconnect();
});

const title = chalkAnimation.glitch('\t\t\tpingx');
title.start();

const showWelcomeAnimation = async () => {
	title.stop();
	process.stdout.clearLine();
	// console.log(chalk.whiteBright('\t\t\tpingx'));
	const welcome = chalkAnimation.rainbow(
		'================connected to server================',
	);
	welcome.start();
	await sleep(777);
	welcome.stop();
};

const askUsername = async () => {
	if (!username) {
		const ans = await inquirer.prompt({
			name: 'username',
			type: 'input',
			message: 'enter username: ',
		});
		username = ans.username;
	}
};

const askJoiningMode = async () => {
	const ans2 = await inquirer.prompt({
		name: 'joining',
		type: 'list',
		message: '',
		choices: ['create room', 'join room'],
	});
	joiningMode = ans2.joining;
};

const askRoomID = async () => {
	if (joiningMode === 'create room') {
		const creating = chalkAnimation.karaoke('creating new room');
		creating.start();
		roomID = await axios
			.get(`${serverURL}/create`)
			.then(res => res.data.roomID);
		creating.stop();
		console.log(chalk.green(`room #${roomID} created`));
	} else {
		const ans3 = await inquirer.prompt({
			name: 'roomID',
			type: 'input',
			message: 'enter room ID: ',
		});
		roomID = ans3.roomID;
	}
};

const joinRoom = () => {
	return new Promise((resolve, reject) => {
		socket.emit('join-room', { username, roomID });
		setTimeout(() => {
			reject();
		}, 5000);
		socket.on('room-join-success', () => {
			console.log(chalk.green(`joined room #${roomID} successfully`));

			// currently having to turn off these event listeners manually to prevent the listeners from getting compounded after every recursive call.
			//TODO: figure out a better way to handle this issue.
			socket.off('room-join-success');
			socket.off('room-join-failure');

			resolve();
		});
		socket.on('room-join-failure', msg => {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(chalk.red("couldn't join room:", msg));

			socket.off('room-join-success');
			socket.off('room-join-failure');

			reject();
		});
	});
};

const sendMessage = msg => {
	socket.emit('send-message', {
		message: msg,
		username,
		timeStamp: new Date(),
	});
};

const handleReceiveMessage = () => {
	socket.on('receive-message', msg => {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		const u =
			msg.username === 'SERVER' ? chalk.magentaBright : chalk.cyanBright;

		console.info(
			`${chalk.green('>')} ${chalk.yellowBright(msg.username)}: ${u(
				msg.message,
			)}`,
		);
	});
};

const handleRoomUpdate = () => {
	socket.on('room-update', data => {
		users = data;
	});
};

const connectToRoom = async () => {
	try {
		await askRoomID();
		await joinRoom();
		handleReceiveMessage();
		handleRoomUpdate();
	} catch (e) {
		console.log(chalk.bgGreen("let's try again"));
		await connectToRoom();
	}
};

const handleCommand = command => {
	const cmd = command.split(' ')[0].slice(1);

	switch (cmd) {
		case 'exit':
			process.exit(0);
			break;
		case 'clear':
			console.clear();
			break;
		case 'users':
			console.log(chalk.underline('users in room #' + roomID + ':'));
			console.log(chalk.white(`\t> ${username} (you)`));
			users.forEach(
				u =>
					u !== username &&
					console.log(chalk.yellowBright(`\t> ${u}`)),
			);
			break;
		case 'return':

		case 'help':
			console.log(
				`${chalk.yellow('!exit')} - exits the program\n` +
					`${chalk.yellow('!clear')} - clears the console\n` +
					`${chalk.yellow('!help')} - prints this message`,
			);
			break;
		default:
			console.log(
				'Error : ' + chalk.red(`${cmd} is not a valid command`),
			);
	}
};

const handleMessaging = async () => {
	while (true) {
		const ans = await inquirer.prompt({
			name: 'message',
			type: 'input',
			message: 'you: ',
		});

		if (ans.message.startsWith('!')) {
			handleCommand(ans.message);
			continue;
		}

		sendMessage(ans.message);
	}
};

socket.on('connect', async () => {
	await showWelcomeAnimation();
	await askUsername();
	await askJoiningMode();
	await connectToRoom();

	await handleMessaging();
});
