const CloseSocket = socket => socket.close();

const getTimeStamp = () =>
	`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

// temp workaround
const GetNewRoomID = async () => {
	const letters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let roomID = '';
	for (let i = 0; i < 4; i++)
		roomID += letters[Math.floor(Math.random() * letters.length)];

	return roomID;
};

const sendMessage = (socket, username, message, messages, setMessages) => {
	const newMessages = [...messages];
	const data = {
		username,
		message,
		timeStamp: getTimeStamp(),
	};
	newMessages.push(data);
	setMessages(newMessages);
	socket.emit('send-message', data);
};

// get room ID from server

// join server with room ID and username
const JoinRoom = async (socket, roomID, username) => {
	socket.emit('join-room', {
		username,
		roomID,
	});
};

// handle connection

// send message to server

// receive message from server
const ReceiveMessage = (socket, messages, setMessages) => {
	socket.on('receive-message', data => {
		console.log('receiving messages');
		// const newMessages = [...messages, data];
		// const newMessages = messages.slice();
		// // console.log(newMessages);
		// newMessages.push(data);
		// // console.log(newMessages);
		// setMessages(newMessages);
		setMessages(messages => {
			const newMessages = [...messages];
			newMessages.push(data);
			return newMessages;
		});
	});
};

// handle disconnecting user

export {
	GetNewRoomID,
	CloseSocket,
	JoinRoom,
	sendMessage,
	ReceiveMessage,
	getTimeStamp,
};
