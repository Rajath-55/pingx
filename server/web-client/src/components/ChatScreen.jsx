import React from 'react';

export default function ChatScreen({ socket }) {
	return (
		socket && (
			<div>
				<form
					action=''
					onSubmit={e => {
						e.preventDefault();
						socket?.emit('new message', {
							username: e.target.username.value,
							message: e.target.message.value,
							timeStamp: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
						});
					}}
				>
					<input
						type='text'
						name='username'
						placeholder='Username'
						className='mx-10'
					/>
					<input type='text' name='message' placeholder='Message' />
					<button type='submit'>Send</button>
				</form>
			</div>
		)
	);
}
