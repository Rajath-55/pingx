import React, { useContext } from 'react';

import { ServerContext } from '../contexts/ServerContext.js';
import OtherMessage from './OtherMessage.jsx';
import SelfMessage from './SelfMessage.jsx';
import ServerMessage from './ServerMessage.jsx';

export default function Message({ username, message, timeStamp }) {
	const ctx = useContext(ServerContext);

	if (username === ctx.username)
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
