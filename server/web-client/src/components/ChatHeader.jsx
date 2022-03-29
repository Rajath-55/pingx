import React, { useContext } from 'react';

import UsersIcon from '../assets/users.svg';
import { ServerContext } from '../contexts/ServerContext.js';

export default function ChatHeader() {
	const { roomID, usersOnline } = useContext(ServerContext);

	return (
		<div className='flex justify-between w-full'>
			<h3 className='font-bold text-xl'>{`#${roomID}`}</h3>
			<div className='flex'>
				<p className='text-xl'>{usersOnline}</p>
				<img className='w-7' src={UsersIcon} alt='users online.' />
			</div>
		</div>
	);
}
