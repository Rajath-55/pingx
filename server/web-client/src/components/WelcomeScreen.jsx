import React, { useContext, useState } from 'react';

import Button from './Button.jsx';
import InputField from './InputField.jsx';
import { JoinRoom, GetNewRoomID } from '../util/Server.js';
import { ServerContext } from '../contexts/ServerContext.js';

export default function WelcomeScreen({ toggleLoading, showError, setMode }) {
	const [usernameInput, setUsernameInput] = useState('');
	const [roomIDInput, setRoomIDInput] = useState('');
	const [crtBtnHeight, setCrtBtnHeight] = useState('scale-y-100');
	const [joining, setJoining] = useState(false);
	const { setUsername, setRoomID, socket } = useContext(ServerContext);

	const handleJoinOnClick = async () => {
		if (!joining) {
			setCrtBtnHeight('scale-y-0');
			setTimeout(() => setJoining(true), 125);
			return;
		}

		// Validation Logic
		if (roomIDInput.length === 0) {
			showError({
				head: 'Error',
				message: 'Please enter a room ID.',
			});
			return;
		}

		if (roomIDInput.length !== 4) {
			showError({
				head: 'Error',
				message: 'Room ID must be a 4 character string.\nTry again.',
			});
			return;
		}

		if (usernameInput.length === 0) {
			showError({
				head: 'Error',
				message: 'Please enter a username.',
			});
			return;
		}
		// make a request to the server to check if the username doesnt clash. Show error message if clash.
		// If no clash, just switch to the /chat route and join the room
		toggleLoading(true);
		setUsername(usernameInput);
		roomIDInput.toLowerCase();
		setRoomID(roomIDInput);

		await JoinRoom(socket, roomIDInput, usernameInput);
		toggleLoading(false);
		setMode('Chat');
	};

	const handleCreateOnClick = async () => {
		// Validation Logic
		if (usernameInput.length === 0) {
			showError({
				head: 'Error',
				message: 'Please enter a username.',
			});
			return;
		}
		// make a GET request to the server to create a new room, grab the new ID, then switch to the /chat route and join the room.
		toggleLoading(true);
		setUsername(usernameInput);
		const id = await GetNewRoomID();
		setRoomID(id);
		console.log(id);
		await JoinRoom(socket, roomIDInput, usernameInput);
		toggleLoading(false);
		setMode('Chat');

		// setTimeout(() => {
		// 	toggleLoading(false);
		// 	setMode('Chat');
		// }, 1000);
	};

	return (
		<div className='transition-all px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-around rounded-md bg-white/80 mt-20 w-full max-w-sm'>
			<InputField
				name='username'
				value={usernameInput}
				setValue={setUsernameInput}
			/>
			{joining || (
				<Button className={crtBtnHeight} onClick={handleCreateOnClick}>
					create room
				</Button>
			)}
			{joining && (
				<InputField
					name='room id'
					value={roomIDInput}
					setValue={setRoomIDInput}
				/>
			)}
			<Button onClick={handleJoinOnClick}>join room</Button>
		</div>
	);
}
