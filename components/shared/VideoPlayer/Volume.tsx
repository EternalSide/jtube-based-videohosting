"use client";
import {usePlayer} from "@/hooks/usePlayer";
import {Volume2Icon, VolumeXIcon} from "lucide-react";
import {useState} from "react";

const Volume = () => {
	const [isHover, setIsHover] = useState(false);
	const {
		volumeMuted,
		volumeRef,
		handleMuteVolume,
		handleVolumeClick,
		handleVolumeDrag,
		currentVolume,
	} = usePlayer();
	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className='flex items-center justify-center'
		>
			<button onClick={(e) => handleMuteVolume(e)}>
				{volumeMuted ? (
					<VolumeXIcon className='volume-icon' />
				) : (
					<Volume2Icon className='volume-icon' />
				)}
			</button>
			<div
				onClick={(e) => handleVolumeClick(e)}
				className={`relative w-[0px] flex items-center  invisible transition-all duration-150 opacity-0 ${
					isHover && "!opacity-100 !visible !w-[100px]  ml-3.5"
				}`}
				ref={volumeRef}
			>
				<button
					style={{
						width: `${(currentVolume as number) * 100}%`,
					}}
					onClick={(e) => e.preventDefault()}
					className='h-1 bg-indigo-700 rounded-md z-[50] border-none outline-none'
				/>
				<button
					onMouseDown={handleVolumeDrag}
					style={{
						width: `100%`,
					}}
					onClick={(e) => e.preventDefault()}
					className='h-1 absolute bg-neutral-500 rounded-md border-none outline-none'
				/>
				<div
					onMouseDown={handleVolumeDrag}
					style={{
						left: `${(currentVolume as number) * 100}%`,
					}}
					className='h-5 w-5 absolute -ml-2  bg-indigo-700 rounded-full shadow cursor-pointer'
				/>
			</div>
		</div>
	);
};
export default Volume;
