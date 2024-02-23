import {formatDate} from "@/lib/utils";
import Link from "next/link";
import NextImage from "@/components/shared/NextImage";

const PlaylistCard = ({
	id,
	video_title,
	videoPreviewUrl,
	views,
	createdAt,
	authorUsername,
	playlistId,
}: any) => {
	return (
		<Link
			href={`/video/${id}/?playlist=${playlistId}`}
			className='flex items-start gap-2 p-5 w-full hover:bg-neutral-900 transition rounded-md border-b border-border'
		>
			<NextImage
				alt={video_title}
				src={videoPreviewUrl}
				width='w-[180px] min-w-[180px] max-zxc:w-[140px] max-zxc:min-w-[140px]'
				height='h-[100px]'
				className='rounded-md object-cover'
			/>
			<div>
				<h3 className='font-semibold'>{video_title}</h3>
				<div className='flex items-center gap-1.5 mt-3 max-zxc:flex-col max-zxc:items-start'>
					<div className='flex items-center gap-1.5 '>
						<p className='text-neutral-400 text-sm'>{authorUsername}</p>
						<p className='text-neutral-400 text-sm'>•</p>
					</div>

					<div className='flex items-center gap-1.5'>
						<p className='text-neutral-400 text-sm'>{formatDate(createdAt)}</p>
						<p className='text-neutral-400 text-sm'>•</p>
						<p className='text-neutral-400 text-sm'>{views} просмотров</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default PlaylistCard;
