// @ts-nocheck
"use client";
import {Volume2Icon, VolumeXIcon} from "lucide-react";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
interface Props {
	fileUrl: string;
	videoUrl: string;
	title: string;
	activeSlide: number;
	position: number;
	setIsOpen: any;
}

const HomeVideoBanner = ({
	fileUrl,
	videoUrl,
	title,
	activeSlide,
	position,
	setIsOpen,
}: Props) => {
	const [isHover, setIsHover] = useState(false);
	const [volumeMuted, setVolumeMuted] = useState(true);
	const [currentSecond, setCurrentSecond] = useState(0);
	const [duration, setDuration] = useState(0);
	const [progress, setProgress] = useState(0);
	const videoRef = useRef(null);
	const progressBarRef = useRef(null);

	// Замутить слайд при переключении следующего
	useEffect(() => {
		if (position !== activeSlide) return setVolumeMuted(true);
	}, [activeSlide]);

	const handleProgressBarClick = (event: any) => {
		if (progressBarRef.current) {
			const progressBarWidth = progressBarRef.current.offsetWidth;
			const clickX =
				event.clientX - progressBarRef.current.getBoundingClientRect().left;
			const progressPercentage = (clickX / progressBarWidth) * 100;
			const seconds = (progressPercentage / 100) * duration;
			setCurrentSecond(seconds);
			setProgress((seconds / duration) * 100);
			videoRef.current.currentTime = seconds;
			videoRef.current.frame = seconds;
			videoRef.current.play();
		}
	};

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className='relative z-[100]'
		>
			<video
				className='w-screen h-[320px] object-cover object-center -z-50 rounded-t-none'
				loop
				ref={videoRef}
				muted={volumeMuted ? true : false}
				autoPlay={true}
				onPauseCapture={() => {
					videoRef.current.currentTime = currentSecond;
				}}
				onTimeUpdate={(e) => {
					e.preventDefault();
					setCurrentSecond(e.target.currentTime);
					setDuration(e.target.duration);
					setProgress((e.target.currentTime / e.target.duration) * 100);
				}}
			>
				<source
					src={fileUrl}
					type='video/mp4'
				/>
			</video>
			{isHover && (
				<div className='absolute top-1 right-3 z-50 p-3'>
					{volumeMuted ? (
						<button onClick={() => setVolumeMuted(false)}>
							<VolumeXIcon className='icon_8 hover:opacity-80 transition' />
						</button>
					) : (
						<button onClick={() => setVolumeMuted(true)}>
							<Volume2Icon className='icon_8 hover:opacity-80 transition' />
						</button>
					)}
				</div>
			)}
			<div className='absolute bottom-4 left-4 z-50 bg-indigo-700 p-3 rounded-md'>
				<button
					onClick={() =>
						setIsOpen(true, {currentTime: videoRef.current.currentTime})
					}
				>
					<Link href={`/${videoUrl}`}>
						<p className='text-white text-center'>{title}</p>
					</Link>
				</button>
			</div>

			<div
				ref={progressBarRef}
				className={`h-4 absolute bottom-0 left-0 w-full  z-50`}
			>
				<div onClick={(e) => handleProgressBarClick(e)}>
					<button
						className='h-1 bg-indigo-700 w-full rounded-md z-50'
						style={{
							width: `${progress}%`,
						}}
					/>
					<button
						className='h-1 absolute bg-neutral-700   top-3.5 w-full rounded-md'
						style={{
							width: `100%`,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default HomeVideoBanner;
