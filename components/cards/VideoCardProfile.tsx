import Link from "next/link";
import {NextImage} from "shinigami";

interface Props {
	id: string;
	imageSrc: string;
	title: string;
	views: number;
}

const VideoCardProfile = ({title, views, id, imageSrc}: Props) => {
	return (
		<Link
			className='h-fit'
			href={`video/${id}`}
		>
			<NextImage
				alt={`Видео ${title}`}
				src={imageSrc}
				width='w-full'
				height='h-[200px]'
				className='object-center object-cover rounded-md'
			/>

			<h3 className='font-medium mt-2 text-base'>{title}</h3>
			<p className='text-sm text-zinc-400'>{views} просмотров</p>
		</Link>
	);
};
export default VideoCardProfile;
