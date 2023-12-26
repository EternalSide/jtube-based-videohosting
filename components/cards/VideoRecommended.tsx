"use client";
import {usePlaylist} from "@/hooks/usePlaylist";
import {cn, findAndInspectPlaylistOrder} from "@/lib/utils";
import {Play} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {NextImage} from "shinigami";

const VideoRecommended = ({item, playListMode, playlistId}: any) => {
	const pathname = usePathname();
	const slicedPath = pathname.slice(7);
	const active = playListMode && slicedPath === item._id.toString();
	const {playlist, setPlaylistData} = usePlaylist();

	const changeOrder = () => {
		if (playListMode) {
			const inspection = findAndInspectPlaylistOrder(
				playlist.videos,
				"_id",
				item._id.toString()
			);

			if (!inspection.after) {
				if (!playlist || !playlist.videos) return;
				setPlaylistData({
					isPlayListMode: true,
					currentPlaying: playlist.videos[0]._id,
				});
			} else {
				setPlaylistData({
					isPlayListMode: true,
					currentPlaying: item._id,
				});
			}
		}
	};

	return (
		<Link
			className={cn(
				"flex gap-2 justify-start",
				active && "bg-neutral-900",
				playListMode && "py-3 pl-1.5 pr-5",
				!active && playListMode && "hover:bg-neutral-800 transition"
			)}
			href={
				playListMode
					? `/video/${item._id}?playlist=${playlistId}`
					: `/video/${item._id}`
			}
			onClick={changeOrder}
		>
			<div className={`${playListMode && "gap-1.5 items-center flex"}`}>
				{active ? (
					<Play className='text-indigo-600 h-6 w-6' />
				) : (
					<div className='w-6' />
				)}
				<NextImage
					src={item.videoPreviewUrl}
					alt={item.video_title}
					width={`lg:min-w-[120px] 2xl:min-w-[160px] ${
						playListMode && "!2xl:min-w-[60px] "
					}`}
					height={`h-[94px] ${playListMode && "h-[100px"}`}
					className='rounded-md object-cover'
				/>
			</div>
			<div>
				<h3
					className={`font-semibold 2xl:text-sm text-xs max-w-[220px] ${
						playListMode && "!text-[13px]"
					}`}
				>
					{item.video_title}
				</h3>
				<p className='text-[13px] text-zinc-400 mt-2'>{item.author.username}</p>
				{!playListMode && (
					<p className='text-[13px] text-zinc-400 mt-1'>
						{item.views} просмотров
					</p>
				)}
			</div>
		</Link>
	);
};
export default VideoRecommended;
