import React from 'react';

export default function Header({ setMode }) {
	return (
		<>
			<h1
				className='font-mono font-bold text-5xl cursor-pointer hover:-translate-y-1 transition'
				onClick={() => setMode('Welcome')}
			>
				pingx
			</h1>
			<h2 className='mt-4 font-mono '>web</h2>
		</>
	);
}
