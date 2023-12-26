import {useProgress} from "@/hooks/useProgress";

const VideoBottomDisplay = ({videoRef, videoUrl}: any) => {
	const {handleUpdateProgress} = useProgress();
	return (
		<video
			ref={videoRef}
			className='h-64 w-full rounded-xl rounded-b-none object-cover '
			autoPlay={true}
			loop={true}
			onTimeUpdate={handleUpdateProgress}
		>
			<source
				src={videoUrl}
				type='video/mp4'
			/>
		</video>
	);
};
export default VideoBottomDisplay;
