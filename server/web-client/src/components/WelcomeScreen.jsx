import React, { useState } from 'react';

import Button from './Button.jsx';
import InputField from './InputField.jsx';
import { SetUsername, SetRoomID, GetNewRoomID } from '../util/Server.js';

export default function WelcomeScreen({ toggleLoading, showError, setMode }) {
	const [username, setUsername] = useState('');
	const [roomID, setRoomID] = useState('');
	const [crtBtnHeight, setCrtBtnHeight] = useState('scale-y-100');
	const [joining, setJoining] = useState(false);
	const handleJoinOnClick = () => {
		if (!joining) {
			setCrtBtnHeight('scale-y-0');
			setTimeout(() => setJoining(true), 125);
			return;
		}

		// Validation Logic
		if (roomID.length === 0) {
			showError({
				head: 'Error',
				message: 'Please enter a room ID.',
			});
			return;
		}

		if (roomID.length !== 4) {
			showError({
				head: 'Error',
				message: 'Room ID must be a 4 character string.\nTry again.',
			});
			return;
		}

		if (username.length === 0) {
			showError({
				head: 'Error',
				message: 'Please enter a username.',
			});
			return;
		}
		// make a request to the server to check if the username doesnt clash. Show error message if clash.
		// If no clash, just switch to the /chat route and join the room
		toggleLoading(true);
		SetUsername(username);
		roomID.toLowerCase();
		SetRoomID(roomID);

		setTimeout(() => {
			toggleLoading(false);
			setMode('Chat');
		});
	};

	const handleCreateOnClick = async () => {
		// Validation Logic
		if (username.length === 0) {
			showError({
				head: 'Error',
				message: 'Please enter a username.',
			});
			return;
		}
		// make a GET request to the server to create a new room, grab the new ID, then switch to the /chat route and join the room.
		toggleLoading(true);
		SetUsername(username);
		const id = await GetNewRoomID();
		SetRoomID(id);
		console.log(id);

		setTimeout(() => {
			toggleLoading(false);
			setMode('Chat');
		});
	};

	return (
		<div className='transition-all px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-around rounded-md bg-white/80 mt-20 w-full max-w-sm'>
			<InputField
				name='username'
				value={username}
				setValue={setUsername}
			/>
			{joining || (
				<Button className={crtBtnHeight} onClick={handleCreateOnClick}>
					create room
				</Button>
			)}
			{joining && (
				<InputField
					name='room id'
					value={roomID}
					setValue={setRoomID}
				/>
			)}
			<Button onClick={handleJoinOnClick}>join room</Button>
		</div>
	);
}
