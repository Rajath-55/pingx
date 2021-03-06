import User from './User.js';

class Room {
	constructor(ID) {
		this.roomID = ID;
		this.users = [];
	}

	// First confirm if the username doesn't already exist in the room. If it does, return false. Otherwise, add user to the room and return true.
	addUser(username) {
		this.users.push(new User(username, this.roomID));
	}

	hasUser(username) {
		return this.users.some(user => user.getUsername() === username);
	}

	// Remove user from the room. If the user wasnt in the room anyway, then return false. Otherwise, return true.
	removeUser(username) {
		const L = this.users.length;
		this.users = this.users.filter(user => user.username !== username);

		return this.users.length !== L;
	}

	viewUsers() {
		return this.users.map(user => user.username);
	}

	isEmpty() {
		return this.users.length === 0;
	}

	getRoomID() {
		return this.roomID;
	}
}

export default Room;
