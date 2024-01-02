import VideoCardMe from "@/components/cards/VideoCardMe";
import NotFound from "@/components/shared/NotFound";
import {getNewVideos} from "@/lib/actions/video.action";

const NewVideosPage = async () => {
	const newVideos = await getNewVideos();

	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>Новые</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Видео, которые были опубликованы недавно.
			</p>
			<div className='videos-container'>
				{newVideos?.length > 0 ? (
					newVideos.map((video: any) => (
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
export default NewVideosPage;
