class User {
	constructor(username, roomID) {
		// this.socketID = socketID;
		this.username = username;
		this.roomID = roomID;
		this.addedOn = new Date();
		this.colour = this.setColour();
	}

	getUsername() {
		return this.username;
	}

	getSocketID() {
		return this.socketID;
	}

	getColour() {
		return this.colour;
	}

	setColour() {
		// do something with this.username to set some "unique" light-shade colour into this.colour
		this.colour = '#FFF';
	}
}

export default User;
