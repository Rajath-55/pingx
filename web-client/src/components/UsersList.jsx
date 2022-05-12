import React from 'react';
import { useContext } from 'react';

import { ServerContext } from '../contexts/ServerContext.js';

export default function UsersList({ usersOnline }) {
	const { username } = useContext(ServerContext);
	return (
		<div className=''>
			<p>you</p>
			{usersOnline.map(u => {
				if (u === username) return null;
				return <p>{u}</p>;
			})}
		</div>
	);
}
