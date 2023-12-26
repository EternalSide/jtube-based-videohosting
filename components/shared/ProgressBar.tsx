"use client";
import {useProgress} from "@/hooks/useProgress";
import {useState} from "react";

const ProgressBar = ({progressBarRef}: any) => {
	const {progress, handleProgressBarClick, handleProgressBarDragStart} =
		useProgress();
	const [isHover, setIsHover] = useState(false);
	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			ref={progressBarRef}
			className={`absolute bottom-[93px] left-0 w-full z-50`}
		>
			<div onClick={handleProgressBarClick}>
				<button
					style={{
						width: `${progress}%`,
					}}
					onClick={(e) => {
						e.preventDefault();
					}}
					className='h-1 bg-indigo-700 absolute top-0 rounded-md z-50 border-none outline-none'
				/>
				<button
					style={{
						width: `100%`,
					}}
					onClick={(e) => {
						e.preventDefault();
					}}
					className='h-1 absolute bg-neutral-500  rounded-md border-none outline-none'
				/>
				{isHover && (
					<div
						onMouseDown={handleProgressBarDragStart}
						style={{
							left: `${progress}%`,
						}}
						className='h-4 w-4 absolute -ml-3 -mt-1.5 bg-indigo-700 rounded-full shadow cursor-pointer'
					/>
				)}
			</div>
		</div>
	);
};
export default ProgressBar;
