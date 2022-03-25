import React from 'react';

import { GetUsername } from '../util/Server.js';
import OtherMessage from './OtherMessage.jsx';
import SelfMessage from './SelfMessage.jsx';
import ServerMessage from './ServerMessage.jsx';

export default function Message({ username, message, timeStamp }) {
	const currentUsername = GetUsername();

	if (username === currentUsername)
		return (
			<SelfMessage
				username={username}
				message={message}
				timeStamp={timeStamp}
			/>
		);
	if (username === 'SERVER')
		return (
			<ServerMessage
				username={username}
				message={message}
				timeStamp={timeStamp}
			/>
		);
	return (
		<OtherMessage
			username={username}
			message={message}
			timeStamp={timeStamp}
		/>
	);
}
