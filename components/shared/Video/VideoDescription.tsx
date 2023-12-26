import {ITag} from "@/database/models/tag.model";
import {formatDate} from "@/lib/utils";
import Link from "next/link";

interface Props {
	description: string;
	date: Date;
	views: number;
	tags?: string[];
	title: string;
	category: string;
}

const VideoDescription = ({
	description,
	date,
	views,
	tags,
	title,
	category,
}: Props) => {
	return (
		<div className='rounded-md w-full mt-6 border-y border-border max-lg:px-6 py-3'>
			<div className='flex items-center gap-2.5'>
				<p className='font-semibold'>{views} просмотра</p>
				<p className='font-medium mt-0.5 text-zinc-200'>{formatDate(date)}</p>
				{tags &&
					tags?.length >= 1 &&
					tags.map((tag: any) => (
						<Link
							href={`/search?tag=${tag.name}`}
							prefetch={false}
							key={tag._id}
							className='text-indigo-500 t-0.5'
						>
							#{tag.name}
						</Link>
					))}
			</div>
			<div className='mt-1'>
				<p>{description ? description : "Информация отсутствует."}</p>
			</div>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center gap-3 mt-6'>
					<h3 className='text-indigo-500 font-semibold '>Название: </h3>
					<p>{title}</p>
				</div>
				<div className='flex items-center gap-3'>
					<h3 className='text-indigo-500 font-semibold'>Категория:</h3>
					<p>{category ? category : "Музыка"}</p>
				</div>
			</div>
		</div>
	);
};
export default VideoDescription;
