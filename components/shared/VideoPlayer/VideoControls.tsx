import VideoPause from "./VideoPause";
import VideoSpeed from "./VideoSpeed";
import Volume from "./Volume";
import FullScreen from "@/components/shared/VideoPlayer/FullScreen";
import OpenVideoInWindow from "@/components/shared/VideoPlayer/OpenVideoInWindow";
import TurnOffLight from "@/components/shared/VideoPlayer/TurnOffLight";
import ChangeTime from "@/components/shared/VideoPlayer/ChangeTime";
import VideoProgressBar from "./VideoProgressBar";
import VideoTime from "./VideoTime";

interface Props {
	isHover: boolean;
	videoData: {
		videoUrl: string;
		videoId: string;
		videoTitle: string;
		videoAuthor: string;
	};
	progressBarRef: React.RefObject<HTMLDivElement>;
}

const VideoControls = ({videoData, isHover, progressBarRef}: Props) => {
	return (
		<div
			ref={progressBarRef}
			className={`progress-bar ${isHover && "!opacity-100 !visible"}`}
		>
			<VideoProgressBar videoUrl={videoData.videoUrl} />
			<div className='flex px-4 justify-between items-center h-full'>
				<div className='flex items-center gap-3'>
					<ChangeTime>
						<VideoPause />
					</ChangeTime>
					<Volume />
					<VideoTime />
				</div>
				<div className='flex items-center gap-6'>
					<TurnOffLight />
					<VideoSpeed />
					<OpenVideoInWindow videoData={videoData} />
					<FullScreen />
				</div>
			</div>
		</div>
	);
};
export default VideoControls;
