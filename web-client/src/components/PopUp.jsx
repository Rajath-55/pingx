import React, { useState, useEffect } from 'react';

export default function PopUp({ show, setShow, popupContent }) {
	const [head, setHead] = useState(popupContent.head);
	const [message, setMessage] = useState(popupContent.message);

	useEffect(() => {
		let t;
		if (show) t = setTimeout(() => setShow(false), 2500);

		return () => clearTimeout(t);
	}, [show, setShow]);

	useEffect(() => {
		if (show) {
			setShow(false);
			setTimeout(() => {
				setShow(true);
				setHead(popupContent.head);
				setMessage(popupContent.message);
			}, 300);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popupContent, setShow]);

	return (
		<div className='flex justify-center items-center w-full ring-2'>
			<div
				className={`text-center w-72 sm:w-96 md:w-[32rem] z-20 border border-black absolute bg-[#eee] px-4 py-2 transition-all duration-300 rounded-md flex flex-col justify-center items-center ring-blue-400 shadow-black ${
					show ? 'top-4 shadow-xl' : '-top-full shadow-sm'
				}`}
			>
				<h2 className='font-mono font-bold text-sky-600 text-lg md:text-xl'>
					{head}
				</h2>
				<p className='text-sm md:text-base max-w-sm mt-2 text-gray-600'>
					{message}
				</p>
			</div>
		</div>
	);
}
