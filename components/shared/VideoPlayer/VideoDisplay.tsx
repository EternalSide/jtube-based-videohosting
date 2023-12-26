"use client";
import {usePlayer} from "@/hooks/usePlayer";
import {usePlaylist} from "@/hooks/usePlaylist";
import {useProgress} from "@/hooks/useProgress";
import {getRandomVideo} from "@/lib/utils";
import {Loader2Icon, Pause} from "lucide-react";
import {useRouter} from "next/navigation";
import {SyntheticEvent, useCallback, useEffect, useState} from "react";

const VideoDisplay = ({videoUrl}: {videoUrl: string}) => {
	const {
		volumeMuted,
		handleVideoClick,
		isPaused,
		videoRef,
		findAndInspectPlaylistOrder,
	} = usePlayer();
	const {handleUpdateProgress, isBuffering, handleBuffering} = useProgress();
	const {playlist, setPlaylistData} = usePlaylist();
	const router = useRouter();
	const [nextVideo, setNextVideo] = useState();
	const memoizedHandleUpdateProgress = useCallback(
		(e: SyntheticEvent<HTMLVideoElement>) => handleUpdateProgress(e),
		[videoUrl]
	);

	// Определить следующее видео если PlayListMode
	useEffect(() => {
		if (playlist.isPlayListMode) {
			const {after} = findAndInspectPlaylistOrder(
				playlist.videos,
				"_id",
				playlist.currentPlaying
			);

			setNextVideo(after !== null ? after._id : null);
		}
	}, [playlist]);

	const onEnded = () => {
		if (!playlist || !playlist?.videos || !playlist.isPlayListMode) return;
		// Рандом порядок воиспрозведения
		if (playlist.randomOrder && playlist?.currentPlaying) {
			const randomVideo = getRandomVideo(
				playlist.videos,
				playlist.currentPlaying
			);
			setPlaylistData({currentPlaying: randomVideo._id});
			router.push(`/video/${randomVideo._id}?playlist=${playlist.playlistId}`);
			return;
		}
		if (nextVideo) {
			setPlaylistData({currentPlaying: nextVideo});
			router.push(`/video/${nextVideo}?playlist=${playlist.playlistId}`);
		} else {
			setPlaylistData({currentPlaying: playlist?.videos?.[0]._id});
			router.push(
				`/video/${playlist?.videos[0]._id}?playlist=${playlist.playlistId}`
			);
		}
	};

	return (
		<>
			<video
				ref={videoRef}
				className='h-full w-full !rounded-xl object-cover'
				autoPlay={false}
				loop={playlist.isPlayListMode ? false : true}
				muted={volumeMuted ? true : false}
				controls={false}
				onClick={handleVideoClick}
				onTimeUpdate={memoizedHandleUpdateProgress}
				onEnded={onEnded}
				onCanPlay={handleBuffering}
			>
				<source
					src={videoUrl}
					type='video/mp4'
				/>
			</video>
			{isPaused && (
				<div className='bg-indigo-600/30 absolute left-2/4 invisible top-2/4  -translate-x-2/4 -translate-y-2/4 rounded-full h-20 w-20 flex justify-center items-center animate-fade-out'>
					<Pause className='h-10 w-10' />
				</div>
			)}
			{isBuffering && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						color: "white",
						fontWeight: "bold",
						opacity: 0.7,
					}}
				>
					<Loader2Icon className='relative mx-auto  h-20 w-20 animate-spin text-indigo-500' />
				</div>
			)}
		</>
	);
};

export default VideoDisplay;
