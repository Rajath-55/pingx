import React, { useState } from 'react';

import Button from './Button.jsx';
import InputField from './InputField.jsx';

export default function WelcomeScreen({ toggleLoading, showError }) {
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
		// Handle the logic of checking if the room ID format is correct, display error accordingly if not
		// If the room ID format is correct, make a request to the server to check if the username doesnt clash. Show error message if clash.
		// If no clash, just switch to the /chat route and join the room
	};

	const handleCreateOnClick = () => {
		// make a GET request to the server to create a new room, grab the new ID, then switch to the /chat route and join the room.
		showError({ head: 'Bruh', message: 'Bruh' });
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
					Create Room
				</Button>
			)}
			{joining && (
				<InputField
					name='room id'
					value={roomID}
					setValue={setRoomID}
				/>
			)}
			<Button onClick={handleJoinOnClick}>Join Room</Button>
		</div>
	);
}
