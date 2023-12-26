import VideoCardProfile from "@/components/cards/VideoCardProfile";
import {IVideo} from "@/database/models/video.model";
const UserVideos = ({videos, query}: any) => {
	return (
		<div className='mt-8 h-full'>
			<h3 className='font-semibold text-2xl'>Видео</h3>

			{videos.length > 0 ? (
				<div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-3 gap-6'>
					{videos.map((video: IVideo) => (
						<VideoCardProfile
							key={video._id}
							id={video._id.toString()}
							imageSrc={video.videoPreviewUrl}
							title={video.video_title}
							views={video.views}
						/>
					))}
				</div>
			) : (
				<div className='mt-3'>
					<p className='text-neutral-400'>
						На этом канале нет материалов, которые соответствуют запросу{" "}
						<span className='text-indigo-500'>"{query}"</span>
					</p>
				</div>
			)}
		</div>
	);
};
export default UserVideos;
