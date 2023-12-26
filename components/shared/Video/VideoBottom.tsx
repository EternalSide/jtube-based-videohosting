"use client";
import {useVideoBottom} from "@/hooks/useVideoBottom";
import {Maximize2, Pause, Play, X} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useRef, useState} from "react";
import ActionTooltip from "../ActionTooltip";
import Link from "next/link";
import useVB from "@/hooks/useVB";
import {ProgressProvider} from "@/providers/ProgressProvider";
import ProgressBar from "@/components/shared/ProgressBar";
import VideoBottomDisplay from "@/components/shared/Video/VideoBottomDisplay";

const VideoBottom = () => {
	const {isOpen, setIsOpen, data} = useVideoBottom();
	const pathname = usePathname();
	const router = useRouter();
	const videoRef = useRef<HTMLVideoElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [isHover, setIsHover] = useState(false);
	useVB({
		pathname,
		videoRef,
		isPaused,
		setIsOpen,
		data,
		setIsPaused,
		isOpen,
	});

	if (!isOpen || !data.videoUrl) return null;

	return (
		<ProgressProvider
			videoRef={videoRef}
			progressBarRef={progressBarRef}
		>
			<div className='w-[420px] rounded-md fixed bottom-0 right-3'>
				{isHover && (
					<div
						onMouseLeave={() => setIsHover(false)}
						className='h-64 absolute top-0 left-0 bg-black/50  w-full rounded-xl rounded-b-none'
					/>
				)}
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onClick={() => (isPaused ? setIsPaused(false) : setIsPaused(true))}
				>
					<VideoBottomDisplay
						videoRef={videoRef}
						videoUrl={data.videoUrl}
					/>
					{isHover && (
						<div className='w-full absolute top-0 h-64'>
							<div className='flex items-center justify-between px-4 pt-4'>
								<ActionTooltip
									side='bottom'
									label='Развернуть'
									classNames='mt-2 !ml-[52px]'
								>
									<button
										onClick={() => {
											setIsOpen(false, {
												currentTime:
													videoRef?.current && videoRef.current.currentTime,
											});
											return router.push(`/video/${data.videoId}`);
										}}
									>
										<Maximize2 className='icon_8' />
									</button>
								</ActionTooltip>
								<ActionTooltip
									side='bottom'
									label='Закрыть'
									classNames='mt-2 mr-[12px]'
								>
									<button
										onClick={() => {
											setIsOpen(false);
										}}
									>
										<X className='icon_8' />
									</button>
								</ActionTooltip>
							</div>

							{isPaused ? (
								<ActionTooltip
									side='bottom'
									label='Воспроизвести'
									classNames='mt-2'
								>
									<button
										className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
										onClick={() => {
											setIsPaused(false);
										}}
									>
										<Play className='h-12 w-12' />
									</button>
								</ActionTooltip>
							) : (
								<ActionTooltip
									side='bottom'
									label='Пауза'
									classNames='mt-2'
								>
									<button
										className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
										onClick={() => {
											setIsPaused(true);
										}}
									>
										<Pause className='h-12 w-12' />
									</button>
								</ActionTooltip>
							)}
						</div>
					)}
				</div>
				<ProgressBar progressBarRef={progressBarRef} />
				<Link
					href={`/video/${data.videoId}`}
					className='min-h-[90px] p-5 pb-2.5 bg-neutral-800 w-full z-[20] block cursor-pointer'
				>
					<h3 className='font-semibold text-sm'>{data.videoTitle}</h3>
					<p className='font-medium text-xs text-neutral-400 mt-1.5'>
						{data.videoAuthor}
					</p>
				</Link>
			</div>
		</ProgressProvider>
	);
};
export default VideoBottom;
