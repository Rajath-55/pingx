import React, { useContext, useEffect } from 'react';

import Messages from './Messages.jsx';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput.jsx';
import { ReceiveMessage, UpdateUsersOnline } from '../util/Server.js';
import { ServerContext } from '../contexts/ServerContext.js';

export default function ChatScreen({ showError, toggleLoading, setMode }) {
	const { socket, messages, setMessages, usersOnline, setUsersOnline } =
		useContext(ServerContext);

	// registering the callback to receive messages from the server
	useEffect(() => {
		ReceiveMessage(socket, messages, setMessages);
		UpdateUsersOnline(socket, usersOnline, setUsersOnline);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='transition-all px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-between items-center rounded-md bg-white/80 mt-6 w-full sm:max-w-sm md:max-w-md lg:max-w-lg text-def-bg'>
			<ChatHeader />
			<Messages />
			<MessageInput />
		</div>
	);
}
