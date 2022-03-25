import React from 'react';

import { GetRoomID } from '../util/Server';
import Messages from './Messages.jsx';
import UsersIcon from '../assets/users.svg';

export default function ChatScreen({
	showError,
	toggleLoading,
	setMode,
	messages,
	usersOnline,
}) {
	const roomID = GetRoomID();

	return (
		<div className='transition-all px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-between items-center rounded-md bg-white/80 mt-20 w-full max-w-sm text-def-bg'>
			{/* <form action='' onSubmit={e => sendMessage(e.target.message.value)}>
				<input type='text' name='message' placeholder='Message' />
				<Button type='submit'>Send</Button>
			</form> */}
			<div className='flex justify-between w-full'>
				<h3 className='font-bold text-xl'>{`#${roomID}`}</h3>
				<div className='flex'>
					<p className='text-xl'>{usersOnline}</p>
					<img className='w-7' src={UsersIcon} alt='users online.' />
				</div>
			</div>
			<Messages messages={messages} />
		</div>
	);
}
