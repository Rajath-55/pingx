let username = '';
let roomID = '';
let socket = '';

const GetRoomID = () => roomID;
const SetRoomID = id => (roomID = id);
const SetUsername = name => (username = name);
const GetUsername = () => username;
const SetSocket = skt => (socket = skt);

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

const sendMessage = message => {
	socket?.emit('new message', {
		username,
		message,
		timeStamp: getTimeStamp(),
	});
};

// get room ID from server

// join server with room ID and username

// handle connection

// send message to server

// receive message from server

// handle disconnecting user

export {
	GetRoomID,
	GetNewRoomID,
	SetRoomID,
	GetUsername,
	SetUsername,
	SetSocket,
	sendMessage,
};
