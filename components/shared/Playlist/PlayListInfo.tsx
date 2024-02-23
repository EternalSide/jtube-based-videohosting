import SetPlaylistMode from "@/components/actions/SetPlaylistMode";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import NextImage from "@/components/shared/NextImage";

const PlayListInfo = ({
	name,
	picture,
	username,
	firstVideo,
	createdAt,
	videos,
	playlistId,
}: any) => {
	return (
		<div className='fixed h-screen w-[360px] gradient rounded-mg p-6  max-[1200px]:w-full max-[1200px]:h-[400px] z-[10]'>
			<NextImage
				alt={name}
				src={picture}
				width='w-full max-[1200px]:w-64'
				height='h-64 max-[1200px]:h-40'
				className='rounded-md object-cover'
			/>
			<h3 className='mt-3 font-semibold text-3xl'>{name}</h3>
			<Link href={`/${username}`}>
				<p className='font-medium mt-5'>{username}</p>
			</Link>
			<div className='flex items-center gap-3 mt-2'>
				<p className='text-sm text-neutral-200'>
					{videos && videos.length} видео
				</p>
				<p className='text-sm text-neutral-200'>
					Создан {formatDate(createdAt)}
				</p>
			</div>
			<SetPlaylistMode
				playlistname={name}
				videos={videos}
				currentVideo={firstVideo}
				playlistId={playlistId}
			/>
		</div>
	);
};
export default PlayListInfo;
