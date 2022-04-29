import React from 'react';
import LoadingSVG from '../assets/loading.svg';

export default function Loading({ set }) {
	return (
		set && (
			<div className='absolute h-full w-full z-10 flex justify-center items-center bg-def-bg/70'>
				<img src={LoadingSVG} alt='Loading...' className='w-20' />
			</div>
		)
	);
}
