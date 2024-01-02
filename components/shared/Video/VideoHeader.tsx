import Link from "next/link";
import FollowAction from "@/components/actions/FollowAction";
import WatchLaterAction from "@/components/actions/WatchLaterAction";
import LikeAction from "@/components/actions/LikeAction";
import CopyAction from "@/components/actions/CopyAction";
import {NextImage} from "shinigami";
import OpenPlaylistModalAction from "@/components/actions/OpenPlaylistModalAction";

interface VideoHeaderProps {
	authorUsername: string;
	videoTitle: string;
	authorPicture: string;
	authorName: string;
	currentUserName: string;
	currentUserId: string;
	authorId: string;
	videoId: string;
	upVotesLength: number;
	downVotesLength: number;
	authorFollowersLength: number;
	isFollowing: boolean;
	inWatchedList: boolean;
	isOwnVideo: boolean;
	isLiked: boolean;
	isDisliked: boolean;
	videoPicture: string;
}

const VideoHeader = ({
	authorUsername,
	videoTitle,
	authorPicture,
	authorFollowersLength,
	authorName,
	isOwnVideo,
	isDisliked,
	isLiked,
	upVotesLength,
	downVotesLength,
	isFollowing,
	authorId,
	videoId,
	currentUserName,
	currentUserId,
	inWatchedList,
	videoPicture,
}: VideoHeaderProps) => {
	return (
		<div className='mt-6 max-lg:px-6'>
			<h1 className='text-xl font-medium'>{videoTitle}</h1>
			<div className='mt-4 flex justify-between items-center max-[1330px]:flex-col  max-[1330px]:items-start  max-[1330px]:gap-5'>
				<div className='flex gap-3 items-center min-w-[350px]'>
					<Link href={`/${authorUsername}`}>
						<NextImage
							alt={authorUsername}
							src={authorPicture}
							width='w-12'
							height='h-12'
							className='rounded-full object-cover'
						/>
					</Link>

					<div>
						<Link href={`/${authorUsername}`}>
							<h3 className='font-medium'>{authorName}</h3>
						</Link>
						<p className='text-sm text-zinc-400'>
							{authorFollowersLength} подписчиков
						</p>
					</div>
					{isOwnVideo ? (
						<Link href={`/${currentUserName}`}>
							<button
								className='hidden py-2 px-5 font-medium rounded-3xl ml-1 hover:opacity-90 transition bg-indigo-700 text-zinc-200'
								type='button'
							>
								Редактировать
							</button>
						</Link>
					) : (
						<FollowAction
							isFollowing={isFollowing}
							userId={authorId}
							currentUserId={currentUserId}
							classNames='py-2 ml-3'
						/>
					)}
				</div>

				<div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start max-sm:gap-4'>
					<LikeAction
						downVotesLength={downVotesLength}
						upVotesLength={upVotesLength}
						isLiked={isLiked}
						isDisliked={isDisliked}
						currentUserId={currentUserId}
						videoId={videoId}
					/>

					<div className='flex gap-3 items-center'>
						<WatchLaterAction
							currentUserId={currentUserId}
							inWatchedList={inWatchedList}
							videoId={videoId}
						/>
						<CopyAction />
						<OpenPlaylistModalAction
							videoId={videoId}
							currentUserId={currentUserId}
							videoPicture={videoPicture}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default VideoHeader;
