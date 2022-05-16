import React, { useContext } from 'react';

import { ServerContext } from '../contexts/ServerContext.js';
import OtherMessage from './OtherMessage.jsx';
import SelfMessage from './SelfMessage.jsx';
import ServerMessage from './ServerMessage.jsx';
import { getTimeStamp } from '../util/Server.js';

export default function Message({ username, message, timeStamp }) {
	const ctx = useContext(ServerContext);
	const ts = getTimeStamp(timeStamp);

	if (username === ctx.username)
		return (
			<SelfMessage username={username} message={message} timeStamp={ts} />
		);
	if (username === 'SERVER')
		return (
			<ServerMessage
				username={username}
				message={message}
				timeStamp={ts}
			/>
		);
	return (
		<OtherMessage username={username} message={message} timeStamp={ts} />
	);
}
