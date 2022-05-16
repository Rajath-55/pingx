const CloseSocket = socket => socket.close();

const getTimeStamp = () =>
	`${new Date().getHours()}:${new Date().getMinutes()}`;

// get the server URL, which is hosted at same link just PORT 5500
// need to change this to accomodate dev and prod environments and pick the URL accordingly
const getServerURL = () => {
	if (process.env.NODE_ENV === 'development') {
		// if dev environment, then look at localhost:5500, otherwise if in production, then look at the deployed heroku server.
		const x = window.location.href.split(':');
		x[x.length - 1] = '5500';
		return x.join(':');
	}
	return 'https://pingx-server.herokuapp.com';
};

// get room ID from server
// temp workaround
const GetNewRoomID = async () => {
	const response = await fetch(`${getServerURL()}/create`);
	const data = await response.json();
	return data.roomID;
};

// join server with room ID and username
const JoinRoom = (socket, roomID, username) => {
	return new Promise((resolve, reject) => {
		socket.emit('join-room', {
			username,
			roomID,
		});
		// if the server takes too long to respond, then reject
		setTimeout(() => {
			reject('server took too long to respond.');
		}, 7777);
		// if the server sends back a room does not exist prompt, then reject
		socket.on('room-join-failure', data => {
			reject(data);
		});
		// if the server sends back a room exists prompt, then resolve
		socket.on('room-join-success', () => {
			resolve('room successfully joined.');
		});
	});
};

// send message to server
const sendMessage = (socket, username, message, messages, setMessages) => {
	const newMessages = [...messages];
	const data = {
		username,
		message,
		timeStamp: new Date(),
	};
	newMessages.push(data);
	setMessages(newMessages);
	socket.emit('send-message', data);
};

// receive message from server
const ReceiveMessage = (socket, messages, setMessages) => {
	socket.on('receive-message', data => {
		// console.log('receiving messages');
		setMessages(messages => {
			const newMessages = [...messages];
			newMessages.push(data);
			return newMessages;
		});
	});
};

// update users online
const UpdateUsersOnline = (socket, usersOnline, setUsersOnline) => {
	socket.on('room-update', data => {
		setUsersOnline(data);
	});
};

export {
	GetNewRoomID,
	CloseSocket,
	JoinRoom,
	sendMessage,
	ReceiveMessage,
	getTimeStamp,
	getServerURL,
	UpdateUsersOnline,
};
