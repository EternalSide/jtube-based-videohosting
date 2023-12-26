import VideoComments from "@/components/shared/Video/VideoComments";
import SheetSidebar from "@/components/shared/Sidebar/SheetSidebar";
import RecomendedVideos from "@/components/shared/Video/RecomendedVideos";
import VideoCommentForm from "@/components/shared/Video/VideoCommentForm";
import VideoDescription from "@/components/shared/Video/VideoDescription";
import VideoHeader from "@/components/shared/Video/VideoHeader";
import VideoPlayer from "@/components/shared/Video/VideoPlayer";
import {ParamsId} from "@/constants/types/index.shared";
import {IUser} from "@/database/models/user.model";
import {getUserById} from "@/lib/actions/user.action";
import {
	addToHistory,
	getMoreVideos,
	getVideoById,
	increaseVideoView,
} from "@/lib/actions/video.action";
import {auth} from "@clerk/nextjs";
import VideoOverlay from "@/components/shared/Video/VideoOverlay";

export async function generateMetadata({params}: ParamsId) {
	const currentVideo = await getVideoById({videoId: params.id});

	if (!currentVideo) {
		return {
			title: `Видео не найдено / JTUBE`,
		};
	}

	return {
		title: `${currentVideo?.video_title} / JTUBE`,
	};
}

const VideoPage = async ({params, searchParams}: any) => {
	const currentVideo = await getVideoById({videoId: params.id});
	const moreVideos = await getMoreVideos({
		sortBy: searchParams?.sort ? searchParams.sort : null,
	});

	const {userId} = auth();
	const currentUser = await getUserById(userId!);

	// Добавить просмотр
	await increaseVideoView({videoId: params.id});

	// Добавить в историю
	if (userId && currentUser.options.saveHistory)
		await addToHistory({videoId: params.id, userId});

	const isOwnVideo =
		currentUser?._id.toString() === currentVideo.author._id.toString();

	const isFollowing = currentUser?.followingIds.some(
		(followedUser: IUser) =>
			followedUser._id.toString() === currentVideo.author._id.toString()
	);

	const followingIds = currentUser
		? JSON.parse(JSON.stringify(currentUser?.followingIds))
		: null;

	return (
		<>
			<SheetSidebar
				username={currentUser?.username}
				followingIds={followingIds}
			/>
			<div className='flex gap-6 2xl:pl-[100px] lg:pl-7 pt-24 pb-12 max-lg:px-0 max-lg:pt-[72px] 2xl:pr-[100px] lg:pr-7'>
				<div className='flex-1 w-full'>
					<VideoPlayer
						videoUrl={currentVideo.videoUrl}
						videoId={currentVideo._id.toString()}
						videoAuthor={currentVideo.author.username}
						videoTitle={currentVideo.video_title}
					/>
					<VideoHeader
						videoId={currentVideo._id.toString()}
						videoPicture={currentVideo.videoPreviewUrl}
						videoTitle={currentVideo.video_title}
						currentUserId={currentUser?._id.toString()}
						currentUserName={currentUser?.username}
						upVotesLength={currentVideo.upvotes.length}
						downVotesLength={currentVideo.downvotes.length}
						authorId={currentVideo.author._id.toString()}
						authorName={currentVideo.author.name}
						authorPicture={currentVideo.author.picture}
						authorUsername={currentVideo.author.username}
						authorFollowersLength={currentVideo.author.followers.length}
						isFollowing={isFollowing}
						isOwnVideo={isOwnVideo}
						inWatchedList={currentUser?.savedVideos.includes(
							currentVideo._id.toString()
						)}
						isLiked={currentVideo.upvotes.includes(currentUser?._id)}
						isDisliked={currentVideo.downvotes.includes(currentUser?._id)}
					/>
					<VideoDescription
						description={currentVideo.video_description}
						tags={JSON.parse(JSON.stringify(currentVideo?.tags))}
						category={currentVideo?.video_category}
						date={currentVideo.createdAt}
						views={currentVideo.views}
						title={currentVideo.video_title}
					/>
					<VideoCommentForm
						userId={currentUser?._id.toString()}
						authorId={currentVideo.author._id.toString()}
						userPicture={currentUser?.picture}
						userName={currentUser?.username}
						videoId={currentVideo?._id.toString()}
						commentsLength={currentVideo.comments.length}
					/>
					<VideoComments
						userId={currentUser?._id}
						videoId={currentVideo?._id.toString()}
						comments={currentVideo.comments}
						authorImage={currentVideo.author.picture}
						authorId={currentVideo.author._id.toString()}
						currentUserUsername={currentUser?.username}
						currentUserPic={currentUser?.picture}
					/>
				</div>
				<RecomendedVideos videos={moreVideos} />
			</div>
			<VideoOverlay />
		</>
	);
};
export default VideoPage;
