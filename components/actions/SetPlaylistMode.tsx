"use client";
import {Play} from "lucide-react";
import {Button} from "../ui/button";
import Link from "next/link";
import {usePlaylist} from "@/hooks/usePlaylist";

const SetPlaylistMode = ({
	currentVideo,
	videos,
	playlistname,
	playlistId,
}: any) => {
	const {setPlaylistData} = usePlaylist();

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
		<Link
			onClick={handlePlaylist}
			href={`/video/${currentVideo}/?playlist=${playlistId}`}
		>
			<Button className='mt-10 w-full rounded-md bg-black gap-1.5 transition hover:opacity-80 mr-6'>
				<Play />
				Воспроизвести
			</Button>
		</Link>
	);
};
export default SetPlaylistMode;
