import React from 'react';

export default function OtherMessage({ username, message, timeStamp }) {
	return (
		<div className='message'>
			<div className={`flex-1 text-left`}>
				<p className='text-sm font-semibold'>{username}</p>
			</div>
			<div
				className={`bg-opacity-50 rounded-md shadow-md px-2 py-0.5 mb-4 bg-purple-500 mr-20 lg:mr-44`}
			>
				<div className={`flex items-center px-4 py-2 bg-transparent`}>
					<div className='flex-1'>
						<p className={`text-sm text-left`}>{message}</p>
					</div>
				</div>
				<div className='flex-1 text-right'>
					<p className={`text-xs text-gray-600 text-left`}>
						{timeStamp.substring(0, 5)}
					</p>
				</div>
			</div>
		</div>
	);
}
