import {useProgress} from "@/hooks/useProgress";
import {secondsToMinutes} from "@/lib/utils";

const VideoTime = () => {
	const {videoDuration, videoCurrentTime} = useProgress();

	return (
		<div className='flex items-center gap-1 ml-1.5'>
			<p className='text-base'>{videoCurrentTime}</p>
			<p className='text-base'>/</p>
			<p className='text-base'>{secondsToMinutes(videoDuration)}</p>
		</div>
	);
};
export default VideoTime;
