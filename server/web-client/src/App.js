/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Header from './components/Header.jsx';
import WelcomeScreen from './components/WelcomeScreen';
import ChatScreen from './components/ChatScreen';
import Loading from './components/Loading';
import PopUp from './components/PopUp.jsx';

function App() {
	const [socket, setSocket] = useState(null);
	const [loading, setLoading] = useState(false);
	const [popup, setPopup] = useState(false);
	const [popupContent, setPopupContent] = useState({
		message:
			'There was an error while trying to reach the server. Please try again later.',
		head: 'Error',
	});
	const [mode, setMode] = useState('Welcome');
	const showError = ({ message, head }) => {
		setPopup(true);
		setPopupContent({ head, message });
	};
	const toggleLoading = option => {
		if (option === undefined) setLoading(!loading);
		else setLoading(option);
	};

	// eslint-disable-next-line no-lone-blocks
	{
		// useEffect(() => {
		// 	const newSocket = io('http://localhost:5500');
		// 	setSocket(newSocket);
		// 	return () => {
		// 		newSocket.close();
		// 	};
		// }, [setSocket]);
		// if (socket) {
		// 	socket.on('new user', data => {
		// 		console.log(
		// 			`A new user has joined the chat.\nThere are now ${data.usersInRoom} users in the chat.`,
		// 		);
		// 	});
		// 	socket.on('new message', data => {
		// 		console.log(`${data.timeStamp} ${data.username}: ${data.message}`);
		// 	});
		// 	socket.on('disconnected', data => {
		// 		console.log(
		// 			`A user has left the chat.\nThere are now ${data.usersInRoom} users in the chat.`,
		// 		);
		// 	});
		// }
	}
	const [messages, setMessages] = useState([
		{ username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
		{ username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
		{ username: 'xyz', message: 'fuck you', timeStamp: '13:00:00' },
		// { username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
		// { username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
		{ username: 'SERVER', message: 'and your mom.', timeStamp: '14:00:00' },
		{ username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
		{ username: 'SERVER', message: 'and your mom.', timeStamp: '14:00:00' },
		{ username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
		{ username: 'xyz', message: 'fuck you', timeStamp: '13:00:00' },
		{ username: 'abcd', message: 'Hello', timeStamp: '12:00:00' },
	]);
	const [usersOnline, setUsersOnline] = useState(3);

	return (
		<div className='relative font-mono '>
			<Loading set={loading} />
			<PopUp
				show={popup}
				setShow={setPopup}
				popupContent={popupContent}
			/>
			<div className='bg-[#282c34] min-h-screen flex flex-col items-center text-white p-8'>
				<Header setMode={setMode} />
				{mode === 'Welcome' ? (
					<WelcomeScreen
						toggleLoading={toggleLoading}
						showError={showError}
						setMode={setMode}
					/>
				) : (
					<ChatScreen
						toggleLoading={toggleLoading}
						showError={showError}
						setMode={setMode}
						messages={messages}
						usersOnline={usersOnline}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
