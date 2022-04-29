import React from 'react';

function InputField({ name, value, setValue, className, refValue, onKeyDown }) {
	return (
		<label
			htmlFor={name}
			className={`text-def-bg text-sm md:text-lg relative ${className}`}
		>
			<input
				type='text'
				value={value}
				name={name}
				id={name}
				onChange={val => setValue(val.target.value)}
				className='peer w-full px-4 py-2 rounded ring-0 focus:outline-none bg-transparent text-gray-800 transition border-b border-def-bg shadow-sm hover:shadow-md focus:shadow-lg max-w-sm placeholder-transparent'
				placeholder={name}
				ref={refValue}
				onKeyDown={onKeyDown}
			/>
			<p className='absolute transition-all duration-100 -top-3 left-0 text-xs opacity-60 peer-focus:opacity-60 peer-focus:-top-3 peer-focus:left-0 peer-focus:text-xs peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-100 cursor-text'>
				enter {name}
			</p>
		</label>
	);
}

export default InputField;
