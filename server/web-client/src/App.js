import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

function App() {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io('http://localhost:5500');
		setSocket(newSocket);
		return () => {
			newSocket.close();
		};
	}, [setSocket]);

	if (socket) {
		socket.on('new user', data => {
			console.log(
				`A new user has joined the chat.\nThere are now ${data.usersInRoom} users in the chat.`,
			);
		});

		socket.on('new message', data => {
			console.log(`${data.timeStamp} ${data.username}: ${data.message}`);
		});

		socket.on('disconnected', data => {
			console.log(
				`A user has left the chat.\nThere are now ${data.usersInRoom} users in the chat.`,
			);
		});
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<form
					action=''
					onSubmit={e => {
						e.preventDefault();
						socket?.emit('new message', {
							username: e.target.username.value,
							message: e.target.message.value,
							timeStamp: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
						});
					}}
				>
					<input
						type='text'
						name='username'
						placeholder='Username'
						className='mx-10'
					/>
					<input type='text' name='message' placeholder='Message' />
					<button type='submit'>Send</button>
				</form>
			</header>
		</div>
	);
}

export default App;
