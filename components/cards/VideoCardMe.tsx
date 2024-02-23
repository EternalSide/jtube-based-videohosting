import Link from "next/link";
import ActionTooltip from "../shared/ActionTooltip";
import {formatDate} from "@/lib/utils";
import NextImage from "@/components/shared/NextImage";

interface Props {
	date: Date;
	views: number;
	id: string;
	title: string;
	videoImg: string;
	authorImg: string;
	authorName: string;
	className?: string;
}

const VideoCardMe = ({
	date,
	views,
	id,
	title,
	videoImg,
	authorImg,
	authorName,
	className,
}: Props) => {
	return (
		<Link
			className={`h-fit ${className}`}
			href={`/video/${id}`}
		>
			<NextImage
				src={videoImg}
				alt={`Видео ${title}`}
				width='w-full'
				height='h-[200px]'
				className='object-center object-cover rounded-md'
			/>

			<div className='flex gap-3 items-start mt-3'>
				<NextImage
					alt={authorName}
					src={authorImg}
					width='w-10 min-w-[40px] '
					height='h-10'
					className='object-center object-cover rounded-full'
				/>

				<div className='flex flex-col gap-0.5'>
					<h3 className='font-medium text-base'>{title}</h3>
					<ActionTooltip
						align='start'
						side='top'
						label={authorName}
					>
						<p className='text-sm text-zinc-400 transition hover:text-white'>
							{authorName}
						</p>
					</ActionTooltip>
					<div className='flex gap-1.5 items-center'>
						<p className='text-sm text-zinc-400'>{views} просмотров</p>
						{/* <span className='text-sm text-zinc-400'>·</span>
						<p className='text-sm text-zinc-400'>{formatDate(date)}</p> */}
					</div>
				</div>
			</div>
		</Link>
	);
};
export default VideoCardMe;
