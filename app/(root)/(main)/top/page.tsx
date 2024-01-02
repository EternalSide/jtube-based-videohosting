import InfiniteScroll from "@/components/shared/InfiniteScroll";
import NotFound from "@/components/shared/NotFound";
import {getTopVideos} from "@/lib/actions/video.action";
import Loading from "./loading";

const TopPage = async () => {
	const topVideos = await getTopVideos({page: 1});

	let isLoading = false;

	if (isLoading) return <Loading />;

	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>В топе</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Видео, которые мы посчитали самыми рейтинговыми за неделю.
			</p>

			<div className=''>
				{topVideos?.length > 0 ? (
					<InfiniteScroll
						videos={topVideos}
						page='topPage'
						containerClassNames='videos-container'
						loadingIcon={true}
						loadingClassNames='my-10'
					/>
				) : (
					<NotFound />
				)}
			</div>
		</div>
	);
};
export default TopPage;
