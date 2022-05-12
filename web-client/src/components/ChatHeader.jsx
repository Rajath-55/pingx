import React, { useContext } from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import UsersIcon from '../assets/users.svg';
import { ServerContext } from '../contexts/ServerContext.js';
import UsersList from './UsersList.jsx';

export default function ChatHeader() {
	const { roomID, usersOnline } = useContext(ServerContext);

	return (
		<div className='flex justify-between w-full'>
			<h3 className='font-bold text-xl'>{`#${roomID}`}</h3>
			<Tippy
				content={<UsersList usersOnline={usersOnline} />}
				interactive={true}
				placement='right-end'
			>
				<div className='flex'>
					<p className='text-xl'>{usersOnline.length || 0}</p>
					<img className='w-7' src={UsersIcon} alt='users online.' />
				</div>
			</Tippy>
		</div>
	);
}
