import React from 'react';

import InputField from './InputField.jsx';
import SendButton from './SendButton.jsx';

export default function MessageInput({ msgInput, setMsgInput }) {
	return (
		<form
			className='w-full h-14 py-2 flex justify-around items-center'
			onSubmit={e => {
				e.preventDefault();
				console.log(e.target.message.value);
				setMsgInput('');
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
