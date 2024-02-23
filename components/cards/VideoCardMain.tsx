import Link from "next/link";
import NextImage from "@/components/shared/NextImage";

interface Props {
	topPlace?: number;
	video_title: string;
	date: string;
	authorName: string;
	authorImage: string;
	videoPreviewUrl: string;
	topCard?: boolean;
	videoUrl: string;
}

const VideoCardMain = ({
	topPlace,
	video_title,
	date,
	authorName,
	authorImage,
	videoPreviewUrl,

	topCard,
	videoUrl,
}: Props) => {
	return (
		<Link
			href={`/video/${videoUrl}`}
			className='flex gap-2 items-start'
		>
			{topCard && (
				<h3 className='font-bold text-[134px] leading-none -mt-4 text-indigo-400 max-lg:hidden'>
					{topPlace}
				</h3>
			)}
			<div className='w-full'>
				<NextImage
					src={videoPreviewUrl}
					alt={video_title}
					width='w-full'
					height='h-[200px]'
					className='rounded-md object-cover'
				/>

				<div className='flex gap-3 items-center'>
					<h3 className='hover:text-white transition mt-2 text-zinc-200  w-full font-semibold line-clamp-2'>
						{video_title}
					</h3>
				</div>
				<div className='flex items-center gap-2 mt-2'>
					<NextImage
						alt={authorName}
						src={authorImage}
						width='w-10'
						height='h-10'
						className='rounded-full object-cover'
					/>

					<div>
						<p className='font-semibold'>{authorName}</p>
						<p className='text-zinc-400 text-sm'>{date}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default VideoCardMain;
