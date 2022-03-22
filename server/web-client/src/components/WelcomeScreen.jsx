import React, { useState } from 'react';

import Button from './Button.jsx';

export default function WelcomeScreen({}) {
	const [username, setUsername] = useState('');
	const [roomID, setRoomID] = useState('');
	const [joining, setJoining] = useState(false);

	return (
		<div className='transition-all h-full px-4 py-4 min-h-[12rem] md:min-h-[16rem] flex flex-col justify-center rounded-md bg-white/80 mt-20 w-full max-w-sm'>
			<label htmlFor='usernameInput' className='text-def-bg relative'>
				<input
					type='text'
					value={username}
					name='username'
					id='usernameInput'
					onChange={val => setUsername(val.target.value)}
					className='peer w-full px-4 py-2 rounded ring-0 focus:outline-none bg-transparent text-gray-800 transition border-b border-def-bg shadow-sm hover:shadow-md focus:shadow-lg max-w-sm'
				/>
				<p className='absolute transition-all duration-100 top-2 left-2 peer-focus:-top-3 peer-focus:left-0 peer-focus:text-xs'>
					Enter Username
				</p>
			</label>
			<Button>Create Room</Button>
			<Button>Join Room</Button>
		</div>
	);
}
