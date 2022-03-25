import React from 'react';

import { GetUsername } from '../util/Server.js';

export default function Message({ username, message, timeStamp }) {
	const currentUsername = GetUsername();
	let bgColour = 'bg-purple-500';
	let textAlign = 'text-left';
	let margin = 'mr-20';

	if (username === currentUsername) {
		bgColour = 'bg-white';
		textAlign = 'text-right';
		margin = 'ml-20';
	}
	if (username === 'SERVER') {
		bgColour = 'bg-sky-500';
		textAlign = 'text-center';
		margin = 'mx-0';
	}

	return (
		<div className=''>
			<div className={`flex-1 ${textAlign}`}>
				<p className='text-sm font-semibold'>{username}</p>
			</div>
			<div
				className={`bg-opacity-50 rounded-md shadow-md px-2 py-0.5 mb-4 ${bgColour} ${margin}`}
			>
				<div className={`flex items-center px-4 py-2 bg-transparent`}>
					<div className='flex-1'>
						<p className={`text-sm ${textAlign}`}>{message}</p>
					</div>
				</div>
				<div className='flex-1 text-right'>
					<p className={`text-xs text-gray-600 ${textAlign}`}>
						{timeStamp.substring(0, 5)}
					</p>
				</div>
			</div>
		</div>
	);
}
