import React from 'react';

export default function Button({ onClick, children }) {
	return (
		<button
			className='transition-all mt-4 md:mt-6 mx-2 sm:mx-4 bg-blue-500 rounded-lg py-3 px-1 text-lg hover:bg-opacity-40 hover:bg-blue-600 focus:outline-none focus:ring-4 hover:shadow-md focus:shadow-sm sm:max-w-sm'
			onClick={onClick}
		>
			{children}
		</button>
	);
}
