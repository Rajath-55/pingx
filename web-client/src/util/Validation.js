const usernameValidation = (username, showError) => {
	if (username.length === 0) {
		showError({
			head: 'Error',
			message: 'Please enter a username.',
		});
		return false;
	}
	return true;
};

const roomIDValidation = (roomID, showError) => {
	if (roomID.length === 0) {
		showError({
			head: 'Error',
			message: 'Please enter a room ID.',
		});
		return false;
	}

	if (roomID.length !== 4) {
		showError({
			head: 'Error',
			message: 'Room ID must be a 4 character string.\nTry again.',
		});
		return false;
	}

	return true;
};

export { usernameValidation, roomIDValidation };
