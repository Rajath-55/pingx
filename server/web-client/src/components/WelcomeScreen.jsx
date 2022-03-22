import React, { useState } from 'react';

import Button from './Button.jsx';
import InputField from './InputField.jsx';

export default function WelcomeScreen({}) {
	const [username, setUsername] = useState('');
	const [roomID, setRoomID] = useState('');
	const [crtBtnHeight, setCrtBtnHeight] = useState('scale-y-100 scale-x-100');
	const [joining, setJoining] = useState(false);

	return (
		<div className='transition-all h-full px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-around rounded-md bg-white/80 mt-20 w-full max-w-sm'>
			<InputField
				name='username'
				value={username}
				setValue={setUsername}
			/>
			{joining || <Button className={crtBtnHeight}>Create Room</Button>}
			<Button
				onClick={() => {
					setCrtBtnHeight('scale-y-0 scale-x-0');
					setTimeout(() => setJoining(true), 100);
				}}
			>
				Join Room
			</Button>
		</div>
	);
}
