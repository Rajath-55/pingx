import React from 'react';

export default function SendButton() {
	return (
		<button
			className={`transition-all bg-blue-500 w-1/5 ml-2 h-10 rounded-md text-sm md:text-lg hover:bg-opacity-40 hover:bg-blue-600 hover:-translate-y-1 focus:outline-none focus:ring-4 hover:shadow-md focus:shadow-sm text-[#eee]`}
			type='submit'
		>
			send
		</button>
	);
}
