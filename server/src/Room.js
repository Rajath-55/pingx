import User from './User.js';

class Room {
	constructor(ID) {
		this.roomID = ID;
		this.users = [];
	}

	// First confirm if the username doesn't already exist in the room. If it does, return false. Otherwise, add user to the room and return true.
	addUser(username) {
		let ok = true;

		this.users.every(user => {
			if (user.username === username) ok = false;
			return ok;
		});
		if (ok) this.users.push(new User(username, this.roomID));

		return ok;
	}

	// Remove user from the room. If the user wasnt in the room anyway, then return false. Otherwise, return true.
	removeUser(username) {
		const L = this.users.length;
		this.users.filter(user => user.name !== username);
		return this.users.length !== L;
	}

	viewUsers() {
		return this.users.map(user => user.username);
	}
}

export default Room;
