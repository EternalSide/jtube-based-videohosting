import InfiniteScroll from "@/components/shared/InfiniteScroll";
import FilterVideos from "../User/FilterVideos";
import PlayListVideos from "../Playlist/PlayListVideos";

const RecomendedVideos = ({videos}: any) => {
	return (
		<div className='!w-[400px]  max-lg:hidden h-fit'>
			<PlayListVideos />
			<div className=''>
				<FilterVideos videosLength={videos.length} />
			</div>
			<InfiniteScroll
				containerClassNames='w-full max-lg:hidden mt-4 flex flex-col gap-2.5 pr-4'
				loadingClassNames='flex flex-col gap-2.5 w-full mt-4'
				page='recommended'
				videos={videos}
				loadingIcon={true}
			/>
		</div>
	);
};
export default RecomendedVideos;
