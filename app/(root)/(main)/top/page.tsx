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
						containerClassNames='grid 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 mt-6 gap-x-6 gap-y-14'
						loadingClassNames='grid 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 mt-14 gap-x-6 gap-y-14'
						skeletonLength={4}
					/>
				) : (
					<NotFound />
				)}
			</div>
		</div>
	);
};
export default TopPage;
