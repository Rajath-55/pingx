import React from 'react';

function InputField({ name, value, setValue }) {
	return (
		<label htmlFor={name} className='text-def-bg relative'>
			<input
				type='text'
				value={value}
				name={name}
				id={name}
				onChange={val => setValue(val.target.value)}
				className='peer w-full px-4 py-2 rounded ring-0 focus:outline-none bg-transparent text-gray-800 transition border-b border-def-bg shadow-sm hover:shadow-md focus:shadow-lg max-w-sm'
			/>
			<p className='absolute transition-all duration-100 top-2 left-2 peer-focus:-top-3 peer-focus:left-0 peer-focus:text-xs cursor-text'>
				Enter Username
			</p>
		</label>
	);
}

export default InputField;
