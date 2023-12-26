import {ChevronRight} from "lucide-react";
import VideoCardMain from "../../cards/VideoCardMain";
import Link from "next/link";
import {formatDate} from "@/lib/utils";

const HomeVideoBlock = ({videos, title, url}: any) => {
	return (
		<div className='mt-14 px-2'>
			<Link href={url}>
				<h3 className='font-semibold text-4xl text-indigo-500'>
					{title}
					<ChevronRight className='inline h-10 w-10' />
				</h3>
			</Link>
			<div className='grid 2xl:grid-cols-4 md:grid-cols-2 mx-auto gap-6 px-3 mt-6'>
				{videos.map((item: any, index: number) => (
					<VideoCardMain
						key={item}
						topPlace={index + 1}
						video_title={item.video_title}
						date={formatDate(item.createdAt)}
						authorName={item.author.username}
						authorImage={item.author.picture}
						videoPreviewUrl={item.videoPreviewUrl}
						videoUrl={item._id.toString()}
					/>
				))}
			</div>
		</div>
	);
};
export default HomeVideoBlock;
