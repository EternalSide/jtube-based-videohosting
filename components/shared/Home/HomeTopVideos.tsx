import {ChevronRight} from "lucide-react";
import Link from "next/link";
import VideoCardMain from "../../cards/VideoCardMain";
import {formatDate} from "@/lib/utils";

const HomeTopVideos = ({topVideos}: any) => {
	return (
		<div className='mt-14 px-2'>
			<div className='w-fit'>
				<Link href='/top'>
					<h1 className='font-semibold text-4xl'>
						<span className='text-indigo-500 '>Топ-3</span> видео
						<ChevronRight className='inline h-10 w-10' />
					</h1>
				</Link>
			</div>
			<div className='grid 2xl:grid-cols-3 md:grid-cols-2 mx-auto gap-6 px-3 mt-8'>
				{topVideos.map((item: any, index: number) => (
					<VideoCardMain
						key={item}
						topPlace={index + 1}
						video_title={item.video_title}
						date={formatDate(item.createdAt)}
						authorName={item.author.username}
						authorImage={item.author.picture}
						videoPreviewUrl={item.videoPreviewUrl}
						videoUrl={item._id.toString()}
						topCard={true}
					/>
				))}
			</div>
		</div>
	);
};
export default HomeTopVideos;
