const ProgressPoint = ({text}: {text: string}) => {
	return (
		<div className='flex flex-col items-start'>
			<button
				type='button'
				className='cursor-default flex justify-center relative items-center -mt-3  z-[10] icon_5 rounded-full bg-[#141414] border border-indigo-500'
			>
				<p className='text-xs'>✓</p>
			</button>
			<p className='font-semibold text-indigo-500 mt-3 max-md:text-sm max-sm:hidden'>
				{text}
			</p>
		</div>
	);
};
export default ProgressPoint;
