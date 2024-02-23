"use client";
import {useProgress} from "@/hooks/useProgress";
import useShoot from "@/hooks/useShoot";
import {Loader2Icon} from "lucide-react";
import {useRef, useState} from "react";

interface Props {
	videoUrl?: string | undefined;
}

const VideoProgressBar = ({videoUrl}: Props) => {
	const {
		videoDuration,
		progress,
		handleProgressBarDragStart,
		handleProgressBarClick,
		progressBarRef,
	} = useProgress();

	const [snapshots, setSnapshots] = useState("");
	const [hoveredSecond, setHoveredSecond] = useState("0:00");
	const secondVideoRef = useRef<HTMLVideoElement>(null);
	const [isHover, setIsHover] = useState(false);
	const [style, setStyle] = useState(0);
	const defineProgress = () => (progress < 0.6 ? `${0.6}%` : `${progress}%`);

	const {onSliderHover, onOutsideSlider} = useShoot({
		setSnapshots,
		setHoveredSecond,
		setStyle,
		setIsHover,
		progressBarRef,
		videoDuration,
		secondVideoRef,
	});

	return (
		<div
			className='relative'
			onMouseMove={onSliderHover}
			onMouseOut={onOutsideSlider}
			onMouseDown={handleProgressBarDragStart}
			onClick={handleProgressBarClick}
		>
			<div
				onMouseEnter={() => setIsHover(false)}
				style={{
					left: `${style}%`,
					transform: "translateX(-50%)",
				}}
				className={`invisible absolute  bottom-[55px] w-64 h-40 ${
					isHover && "!visible"
				}`}
			>
				{videoUrl && snapshots && snapshots?.length > 1 ? (
					<img
						src={snapshots}
						className='w-full h-full border border-indigo-500 rounded-lg'
					/>
				) : (
					<div className='w-full h-full border border-indigo-500 rounded-lg bg-black flex justify-center items-center'>
						<Loader2Icon className='relative mx-auto  h-10 w-10 animate-spin text-indigo-500' />
					</div>
				)}

				<p className='text-center mt-3'>{hoveredSecond}</p>
			</div>
			<button
				style={{
					width: `${progress}%`,
				}}
				className='h-[5px] bg-indigo-700 rounded-md z-50 border-none outline-none absolute top-0'
			/>
			<button
				style={{
					width: `100%`,
				}}
				className='h-[5px] absolute bg-neutral-500 rounded-md border-none outline-none'
			/>
			<div
				onMouseDown={handleProgressBarDragStart}
				style={{
					left: defineProgress(),
				}}
				className='h-4 w-4 absolute -ml-2 -mt-1.5 bg-indigo-700 rounded-full shadow cursor-pointer'
			/>
			{videoUrl && (
				<video
					src={videoUrl}
					ref={secondVideoRef}
					className='hidden'
					controls={false}
					width='800'
					autoPlay={false}
					muted={true}
					preload='auto'
					crossOrigin='anonymous'
				/>
			)}
		</div>
	);
};
export default VideoProgressBar;
