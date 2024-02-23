import {Metadata} from "next";
import HomeVideoBlock from "@/components/shared/Home/HomeVideoBlock";
import HomeTopSlider from "@/components/shared/Home/HomeTopSlider";
import HomeTopVideos from "@/components/shared/Home/HomeTopVideos";
import {
	getAllVideos,
	getNewVideos,
	getTopVideos,
} from "@/lib/actions/video.action";
import InfiniteScroll from "@/components/shared/InfiniteScroll";

export const metadata: Metadata = {
	title: {
		absolute: "Главная / JTUBE",
	},
};

const Home = async () => {
	const topVideos = await getTopVideos({page: 1, mainPage: true});
	const newVideos = await getNewVideos({mainPage: true});
	const allVideos = await getAllVideos({page: 1});

	return (
		<div className='pb-6 relative'>
			<div className='h-[320px] relative'>
				<HomeTopSlider />
			</div>
			<div className='px-5'>
				<HomeTopVideos topVideos={topVideos} />
				<HomeVideoBlock
					videos={newVideos}
					title='Новые'
					url='new'
				/>
				<div className='mt-14 px-2'>
					<h3 className='font-semibold text-4xl text-indigo-500'>Все</h3>

					<InfiniteScroll
						initialVideos={allVideos}
						page='all'
						containerClassNames='grid 2xl:grid-cols-4 md:grid-cols-2 mx-auto gap-6 px-3 mt-6'
						loadingClassNames='grid 2xl:grid-cols-4 md:grid-cols-2 mx-auto gap-6 px-3 mt-6'
						skeletonLength={12}
					/>
				</div>
			</div>
		</div>
	);
};
export default Home;
