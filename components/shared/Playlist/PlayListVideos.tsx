"use client";
import VideoRecommended from "@/components/cards/VideoRecommended";
import {usePlaylist} from "@/hooks/usePlaylist";
import {getPlaylistInfo} from "@/lib/actions/playlist.action";
import {ListOrdered, X} from "lucide-react";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

const PlayListVideos = () => {
	const {playlist, setPlaylistData} = usePlaylist();
	const searchParams = useSearchParams();
	const playlistId = searchParams.get("playlist");
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(true);

	// Если пользователь открыл ссылку с плейлистом, effect сформирует его, если его нету.
	useEffect(() => {
		const getInfo = async () => {
			// @ts-ignore
			const {playlist} = await getPlaylistInfo({
				id: playlistId,
			});
			if (!playlist) return;

			if (playlist.videos) {
				setPlaylistData({
					videos: playlist.videos.reverse(),
					isPlayListMode: true,
					playlistId: playlist._id,
					currentPlaying: pathname.slice(7),
					playlistName: playlist.name,
				});
			}
		};

		if (playlistId) {
			if (playlist.videos && playlist.videos.length > 0) {
				setPlaylistData({
					currentPlaying: pathname.slice(7),
					isPlayListMode: true,
				});
				return;
			} else {
				getInfo();
			}
		}

		return () => {
			setPlaylistData({isPlayListMode: false});
		};
	}, [playlistId]);

	// Если не PlayListMode, то компонент не рендерится.
	if (!playlist.isPlayListMode) return null;

	return (
		<div className='bg-black border border-border mb-6 flex flex-col rounded-md flex-1 pr-4'>
			<div className='flex items-center justify-between w-full px-6 py-4'>
				<div className='flex items-center gap-1.5'>
					<ListOrdered className='text-neutral-200' />
					<h3 className='font-semibold text-xl'>
						Плейлист: {playlist.playlistName}
					</h3>
				</div>
				<button onClick={() => setIsOpen(!isOpen)}>
					<X className='text-neutral-200' />
				</button>
			</div>

			{isOpen && (
				<ScrollArea className='h-[620px]'>
					{playlist?.videos &&
						playlist.videos.map((item: any) => (
							<VideoRecommended
								key={item._id}
								item={item}
								playListMode={playlist.isPlayListMode}
								playlistId={playlist.playlistId!}
							/>
						))}
				</ScrollArea>
			)}
		</div>
	);
};
export default PlayListVideos;
