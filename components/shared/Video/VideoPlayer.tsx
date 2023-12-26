"use client";
import {useRef, useState} from "react";
import VideoControls from "@/components/shared/VideoPlayer/VideoControls";
import VideoDisplay from "../VideoPlayer/VideoDisplay";
import {PlayerProvider} from "@/hooks/usePlayer";
import {ProgressProvider} from "@/providers/ProgressProvider";

interface Props {
	videoUrl: string;
	videoId: string;
	videoTitle: string;
	videoAuthor: string;
}

const VideoPlayer = ({videoUrl, videoId, videoTitle, videoAuthor}: Props) => {
	const [isHover, setIsHover] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const volumeRef = useRef<HTMLDivElement>(null);

	return (
		<PlayerProvider
			videoRef={videoRef}
			containerRef={containerRef}
			progressBarRef={progressBarRef}
			volumeRef={volumeRef}
		>
			<ProgressProvider
				videoRef={videoRef}
				progressBarRef={progressBarRef}
			>
				<div
					ref={containerRef}
					className='relative overflow-hidden h-[680px] z-[1001]'
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<VideoDisplay videoUrl={videoUrl} />
					<VideoControls
						videoData={{videoUrl, videoId, videoTitle, videoAuthor}}
						isHover={isHover}
						progressBarRef={progressBarRef}
					/>
				</div>
			</ProgressProvider>
		</PlayerProvider>
	);
};
export default VideoPlayer;
