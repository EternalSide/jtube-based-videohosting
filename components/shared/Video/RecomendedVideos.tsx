import InfiniteScroll from "@/components/shared/InfiniteScroll";
import FilterVideos from "../User/FilterVideos";
import PlayListVideos from "../Playlist/PlayListVideos";
import VideoRecommended from "@/components/cards/VideoRecommended";

const RecomendedVideos = ({videos}: any) => {
	console.log(videos);
	return (
		<div className='!w-[400px]  max-lg:hidden h-fit'>
			<PlayListVideos />
			{/* <div className=''>
				<FilterVideos videosLength={videos.length} />
			</div> */}
			<div className='w-[400px] max-lg:hidden h-fit'>
				<ul className='w-full flex flex-col gap-2.5 pr-4'>
					{videos.map((video: any) => (
						<VideoRecommended
							key={video._id}
							item={video}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};
export default RecomendedVideos;
