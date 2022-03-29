import React, { useContext } from 'react';
// import { Scrollbar } from 'smooth-scrollbar-react';

import Message from './Message.jsx';
import { ServerContext } from '../contexts/ServerContext.js';

export default function Messages() {
	const { messages } = useContext(ServerContext);

	return (
		// <Scrollbar>
		<div className='overflow-y-scroll max-h-[66vh] w-full'>
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
		// </Scrollbar>
	);
}
