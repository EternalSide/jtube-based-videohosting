import PlaylistCard from "@/components/cards/PlaylistCard";
import PlayListInfo from "@/components/shared/Playlist/PlayListInfo";
import {getPlaylistInfo} from "@/lib/actions/playlist.action";
import {redirect} from "next/navigation";

const PlayListPage = async ({params}: {params: {id: string}}) => {
	// @ts-ignore
	const {playlist, firstVideo} = await getPlaylistInfo({id: params.id});
	if (!playlist) return redirect("/");

	return (
		<div className='h-full'>
			<PlayListInfo
				name={playlist.name}
				picture={playlist.picture}
				username={playlist.user.username}
				firstVideo={firstVideo}
				createdAt={playlist.createdAt}
				videos={playlist.videos}
				playlistId={playlist._id.toString()}
			/>
			<div className='pl-[380px] pt-5 max-[1200px]:pl-0 max-[1200px]:pt-[400px]'>
				{playlist?.videos && playlist.videos.length > 0 && (
					<div className='flex flex-col '>
						{playlist.videos.reverse().map((item: any) => (
							<PlaylistCard
								key={item._id}
								id={item._id}
								video_title={item.video_title}
								videoPreviewUrl={item.videoPreviewUrl}
								views={item.views}
								createdAt={item.createdAt}
								authorUsername={item.author.username}
								playlistId={playlist._id.toString()}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
export default PlayListPage;
