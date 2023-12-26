import VideoCardMe from "@/components/cards/VideoCardMe";
import NotFound from "@/components/shared/NotFound";
import {findVideos} from "@/lib/actions/video.action";

interface Params {
	searchParams: {[key: string]: string | undefined};
}

const SearchPage = async ({searchParams}: Params) => {
	const searchByTag = searchParams?.tag ? searchParams.tag : null;
	const searchByQuery = searchParams?.q ? searchParams.q : null;

	if (!searchByTag && !searchByQuery) {
		return (
			<div className='w-full px-10 pt-[25px]'>
				<p className='text-zinc-400'>Не указаны фильтра для поиска.</p>
			</div>
		);
	}

	let results = [];

	if (searchByTag) {
		// @ts-ignore
		const {videos} = await findVideos({tag: searchByTag, searchByQuery: false});
		results = videos;
	}
	if (searchByQuery) {
		// @ts-ignore
		const {videos} = await findVideos({
			query: searchByQuery,
			searchByQuery: true,
		});
		results = videos;
	}

	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>
				{searchByQuery ? searchByQuery : searchByTag}
			</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Видео,{searchByQuery ? " по запросу:	 " : " по тегу: "}
				<span className='text-indigo-500 font-medium'>
					{searchByQuery ? searchByQuery : searchByTag}
				</span>
			</p>
			<div className='grid 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 mt-6 gap-x-6 gap-y-14'>
				{results?.length > 0 ? (
					results.map((video: any) => (
						<VideoCardMe
							key={video._id}
							id={video._id.toString()}
							authorImg={video.author.picture}
							authorName={video.author.username}
							date={video.createdAt}
							title={video.video_title}
							videoImg={video.videoPreviewUrl}
							views={video.views}
						/>
					))
				) : (
					<NotFound />
				)}
			</div>
		</div>
	);
};
export default SearchPage;
