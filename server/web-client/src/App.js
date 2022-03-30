/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

import Header from './components/Header.jsx';
import WelcomeScreen from './components/WelcomeScreen';
import ChatScreen from './components/ChatScreen';
import Loading from './components/Loading';
import PopUp from './components/PopUp.jsx';
import { ServerContext } from './contexts/ServerContext.js';
import { CloseSocket, getServerURL } from './util/Server';

function App() {
	// state variables and helper functions for controlling the broader UI elements
	const [loading, setLoading] = useState(false);
	const [popup, setPopup] = useState(false);
	const [popupContent, setPopupContent] = useState({
		message: '',
		head: '',
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

	const { socket, setSocket, setMessages } = useContext(ServerContext);

	// as the app loads, connect to the server
	useEffect(() => {
		const newSocket = io(getServerURL());
		setSocket(newSocket);
	}, [setMessages, setSocket]);

	// as the socket is obtained, set up a callback to close the socket when the app closes
	useEffect(() => {
		return () => {
			CloseSocket(socket);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					/>
				)}
			</div>
		</div>
	);
}

export default App;
