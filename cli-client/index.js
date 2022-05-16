import io from 'socket.io-client';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const serverURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5500'
		: 'https://pingx-server.herokuapp.com';

const socket = io(serverURL);
let username, roomID;
const title = chalkAnimation.glitch('\t\t\tpingx');
title.start();
const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

socket.on('connect', async () => {
	// await sleep();
	title.stop();

	const welcome = chalkAnimation.rainbow(
		'================connected to server================',
	);
	welcome.start();
	await sleep(1000);
	welcome.stop();

	if (!username) {
		const ans = await inquirer.prompt({
			name: 'username',
			type: 'input',
			message: 'enter username: ',
		});
		username = ans.username;
	}

	const ans2 = await inquirer.prompt({
		name: 'joining',
		type: 'list',
		message: '',
		choices: ['create room', 'join room'],
	});
	const joining = ans2.joining;

	if (joining === 'create room') {
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

	socket.emit('join-room', { username, roomID });

	socket.on('room-join-success', () => {
		console.log(chalk.green(`joined room #${roomID} successfully`));
	});
	socket.on('room-join-failure', msg => {
		console.log(chalk.red("couldn't join room:", msg));
		process.exit(1);
	});

	socket.on('receive-message', msg => {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		const u = msg.username === 'SERVER' ? chalk.magentaBright : chalk.cyan;

		console.info(
			`${chalk.green('>')} ${chalk.magenta(msg.username)}: ${u(
				msg.message,
			)}\t\t\t\t${msg.timeStamp}`,
		);
	});

	while (true) {
		const ans = await inquirer.prompt({
			name: 'message',
			type: 'input',
			message: 'you: ',
		});

		if (ans.message.startsWith('!')) {
			const cmd = ans.message.split(' ')[0].slice(1);

			switch (cmd) {
				case 'exit':
					process.exit(0);
					break;
				case 'clear':
					console.clear();
					break;
				case 'help':
					console.log(
						`${chalk.yellow('!exit')} - exits the program\n` +
							`${chalk.yellow('!clear')} - clears the console\n` +
							`${chalk.yellow('!help')} - prints this message`,
					);
					break;
				default:
					console.log(chalk.red(`${cmd} is not a valid command`));
			}
		} else
			socket.emit('send-message', {
				message: ans.message,
				username,
				timeStamp: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
			});
	}
});
