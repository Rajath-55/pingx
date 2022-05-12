import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

import { getTimeStamp, CloseSocket, getServerURL } from '../util/Server.js';

const ServerContext = createContext();

const ServerProvider = ({ children }) => {
	const [username, setUsername] = useState('');
	const [roomID, setRoomID] = useState('');
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([
		{
			username: 'SERVER',
			message: 'You are connected to the Server.',
			timeStamp: getTimeStamp(),
		},
	]);
	const [usersOnline, setUsersOnline] = useState([]);

	const resetAll = () => {
		socket && CloseSocket(socket);
		const newSocket = io(getServerURL());
		setSocket(newSocket);

		setUsername('');
		setRoomID('');
		setMessages([
			{
				username: 'SERVER',
				message: 'You are connected to the Server.',
				timeStamp: getTimeStamp(),
			},
		]);
		setUsersOnline([]);
	};

	return (
		<ServerContext.Provider
			value={{
				username,
				setUsername,
				roomID,
				setRoomID,
				socket,
				setSocket,
				messages,
				setMessages,
				usersOnline,
				setUsersOnline,
				resetAll,
			}}
		>
			{children}
		</ServerContext.Provider>
	);
};

export { ServerContext, ServerProvider };
