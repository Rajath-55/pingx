import Room from './Room.js';

class Rooms {
	constructor() {
		this.rooms = [];
	}

	makeNewRoom() {
		const letters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let roomID = '';
		for (let i = 0; i < 4; i++)
			roomID += letters[Math.floor(Math.random() * letters.length)];

		this.rooms.push(new Room(roomID));

		return roomID;
	}

	getRoom(roomID) {
		return this.rooms.find(room => room.getRoomID() === roomID);
	}
}

export default Rooms;
