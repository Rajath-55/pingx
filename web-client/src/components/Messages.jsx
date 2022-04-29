import React, { useContext, useEffect, useRef } from 'react';
// import { Scrollbar } from 'smooth-scrollbar-react';

import Message from './Message.jsx';
import { ServerContext } from '../contexts/ServerContext.js';

export default function Messages() {
	const { messages } = useContext(ServerContext);
	const endRef = useRef(null);

	// ensures that the messages are scrolled to the bottom whenever a new message arrives
	useEffect(() => endRef.current?.scrollIntoView(), [messages]);

	return (
		<div className='max-h-[55vh] w-full overflow-y-scroll'>
			{/* <Scrollbar
				plugins={{
					overscroll: {
						effect: 'bounce',
					},
				}}
				className='messages'
			> */}
			{messages.map((message, index) => (
				<Message
					key={index}
					index={index}
					username={message.username}
					message={message.message}
					timeStamp={message.timeStamp}
				/>
			))}
			<div className='w-0 h-0' ref={endRef}></div>
			{/* </Scrollbar> */}
		</div>
	);
}
