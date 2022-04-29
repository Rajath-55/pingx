import React, { useContext, useState, useEffect, useRef } from 'react';

import Button from './Button.jsx';
import InputField from './InputField.jsx';
import { JoinRoom, GetNewRoomID } from '../util/Server.js';
import { ServerContext } from '../contexts/ServerContext.js';
import { roomIDValidation, usernameValidation } from '../util/Validation.js';
import { writeToClipboard, readFromClipboard } from '../util/General.js';

export default function WelcomeScreen({ toggleLoading, showError, setMode }) {
	// state variables for the form
	const [usernameInput, setUsernameInput] = useState('');
	const [roomIDInput, setRoomIDInput] = useState('');
	const [crtBtnHeight, setCrtBtnHeight] = useState('scale-y-100');
	const [joining, setJoining] = useState(false);
	const { setUsername, setRoomID, socket, resetAll } =
		useContext(ServerContext);
	const roomIDInputRef = useRef(null);

	const handleJoinOnClick = async () => {
		if (!joining) {
			setCrtBtnHeight('scale-y-0');
			setTimeout(async () => {
				setJoining(true);
				roomIDInputRef.current?.focus();
				const clipboardData = await readFromClipboard();
				const pattern =
					/[a-z|A-Z|0-9][a-z|A-Z|0-9][a-z|A-Z|0-9][a-z|A-Z|0-9]/;
				// console.log(clipboardData);
				if (pattern.test(clipboardData)) setRoomIDInput(clipboardData);
			}, 125);
			return;
		}

		// Validation Logic
		if (!roomIDValidation(roomIDInput, showError)) return;
		if (!usernameValidation(usernameInput, showError)) return;

		// make a request to the server to check if the username doesnt clash. Show error message if clash.
		// If no clash, just switch to the /chat route and join the room
		toggleLoading(true);
		setUsername(usernameInput);
		roomIDInput.toLowerCase();
		setRoomID(roomIDInput);

		try {
			await JoinRoom(socket, roomIDInput, usernameInput);
			toggleLoading(false);
			setMode('Chat');
		} catch (e) {
			showError({ head: 'error in joining the room.', message: e });
			toggleLoading(false);
		}
	};

	const handleCreateOnClick = async () => {
		// Validation Logic
		if (!usernameValidation(usernameInput, showError)) return;

		// make a GET request to the server to create a new room, grab the new ID, then switch to the /chat route and join the room.
		toggleLoading(true);
		setUsername(usernameInput);
		const id = await GetNewRoomID();
		setRoomID(id);
		console.log(id);

		await writeToClipboard(id);
		await JoinRoom(socket, id, usernameInput);

		showError({
			head: `new room created`,
			message: (
				<span>
					ID: <span className='font-bold text-lg'>#{id}</span>
					<br />
					copied to clipboard.
					<br />
					share it with others for them to join.
				</span>
			),
		});
		toggleLoading(false);
		setMode('Chat');
	};

	// ensure that when the header is clicked to reopen this window, all the fields are cleared
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => resetAll(), []);

	return (
		<div className='transition-all px-4 py-4 min-h-[14rem] md:min-h-[16rem] h-full flex flex-col justify-around rounded-md bg-white/80 mt-20 w-full max-w-sm'>
			<InputField
				name='username'
				value={usernameInput}
				setValue={setUsernameInput}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						joining ? handleJoinOnClick() : handleCreateOnClick();
					}
				}}
			/>
			{joining && (
				<InputField
					name='room id'
					value={roomIDInput}
					refValue={roomIDInputRef}
					setValue={setRoomIDInput}
					onKeyDown={e => {
						if (e.key === 'Enter') handleJoinOnClick();
					}}
				/>
			)}
			{joining || (
				<Button className={crtBtnHeight} onClick={handleCreateOnClick}>
					create room
				</Button>
			)}
			<Button onClick={handleJoinOnClick}>join room</Button>
		</div>
	);
}
