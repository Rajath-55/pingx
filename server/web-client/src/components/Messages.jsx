import React from 'react';

import Message from './Message.jsx';

export default function Messages({ messages }) {
	return (
		<div className='overflow-y-scroll max-h-[65vh] w-full'>
			{messages.map((message, index) => (
				<Message
					key={index}
					index={index}
					username={message.username}
					message={message.message}
					timeStamp={message.timeStamp}
				/>
			))}
		</div>
	);
}
