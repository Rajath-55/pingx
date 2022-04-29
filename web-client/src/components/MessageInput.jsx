import React, { useState, useContext } from 'react';

import InputField from './InputField.jsx';
import SendButton from './SendButton.jsx';
import { sendMessage } from '../util/Server.js';
import { ServerContext } from '../contexts/ServerContext.js';

export default function MessageInput() {
	const { socket, username, messages, setMessages } =
		useContext(ServerContext);
	const [msgInput, setMsgInput] = useState('');

	return (
		<form
			className='w-full h-14 py-2 mt-2 flex justify-around items-center'
			onSubmit={e => {
				e.preventDefault();
				const msg = e.target.message.value;
				console.log(msg);
				// send message
				sendMessage(socket, username, msg, messages, setMessages);

				setMsgInput('');
				e.target.message.focus();
			}}
		>
			<InputField
				name='message'
				value={msgInput}
				setValue={setMsgInput}
				className='w-4/5'
			/>
			<SendButton />
		</form>
	);
}
