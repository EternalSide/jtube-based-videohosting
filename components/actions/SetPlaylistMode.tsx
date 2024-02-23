"use client";
import {Play} from "lucide-react";
import {Button} from "../ui/button";

import {usePlaylist} from "@/hooks/usePlaylist";
import {useRouter} from "next/navigation";

const SetPlaylistMode = ({
	currentVideo,
	videos,
	playlistname,
	playlistId,
}: any) => {
	const {setPlaylistData} = usePlaylist();
	const router = useRouter();
	const handlePlaylist = () => {
		setPlaylistData({
			isPlayListMode: true,
			currentPlaying: currentVideo,
			videos: videos,
			playlistId: playlistId,
			playlistName: playlistname,
		});
	};

	return (
		<Button
			onClick={() => {
				handlePlaylist();
				router.push(`/video/${currentVideo}/?playlist=${playlistId}`);
			}}
			className='mt-6 w-full rounded-md bg-white text-black font-semibold gap-1.5 transition hover:opacity-80 max-[1200px]:w-64'
		>
			<Play />
			Воспроизвести
		</Button>
	);
};
export default SetPlaylistMode;
