import React from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';

import Message from './Message.jsx';

export default function Messages({ messages }) {
	return (
		<Scrollbar plugins={{ overscroll: { effect: 'bounce' } }}>
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
		</Scrollbar>
	);
}
