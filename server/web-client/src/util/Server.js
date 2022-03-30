const CloseSocket = socket => socket.close();

const getTimeStamp = () =>
	`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

// get the server URL, which is hosted at same link just PORT 5500
// need to change this to accomodate dev and prod environments and pick the URL accordingly
const getServerURL = () => {
	const x = window.location.href.split(':');
	x[x.length - 1] = '5500';
	return x.join(':');
};

// get room ID from server
// temp workaround
const GetNewRoomID = async () => {
	const response = await fetch(`${getServerURL()}/create`);
	const data = await response.json();
	return data.roomID;
};

// join server with room ID and username
const JoinRoom = async (socket, roomID, username) => {
	socket.emit('join-room', {
		username,
		roomID,
	});
};

// send message to server
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

export {
	GetNewRoomID,
	CloseSocket,
	JoinRoom,
	sendMessage,
	ReceiveMessage,
	getTimeStamp,
	getServerURL,
};
