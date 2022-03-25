import React, { useState } from 'react';

import { GetRoomID } from '../util/Server';
import Messages from './Messages.jsx';
import { ChatHeader } from './ChatHeader';
import MessageInput from './MessageInput.jsx';

export default function ChatScreen({
	showError,
	toggleLoading,
	setMode,
	messages,
	usersOnline,
}) {
	const roomID = GetRoomID();
	const [msgInput, setMsgInput] = useState('');

	return (
		<div className='transition-all px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-between items-center rounded-md bg-white/80 mt-8 sm:mt-20 w-full sm:max-w-sm md:max-w-md lg:max-w-lg text-def-bg'>
			<ChatHeader roomID={roomID} usersOnline={usersOnline} />
			<Messages messages={messages} />
			<MessageInput msgInput={msgInput} setMsgInput={setMsgInput} />
		</div>
	);
}
