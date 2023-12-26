import {formatRelativeTime} from "@/lib/utils";
import CommentCard from "./CommentCard";

const VideoComments = ({
	comments,
	userId,
	authorImage,
	authorId,
	videoId,
	currentUserUsername,
	currentUserPic,
}: any) => {
	return (
		<div className='flex flex-col gap-10 max-lg:px-6'>
			{comments.map((comment: any) => (
				<CommentCard
					key={comment._id}
					videoId={videoId}
					text={comment.text}
					userName={comment.author?.username}
					userPicture={comment.author?.picture}
					createdAt={formatRelativeTime(comment.createdAt)}
					downVotesLength={comment.downvotes.length}
					upvotesLength={comment.upvotes.length}
					userId={userId}
					id={comment._id.toString()}
					authorImage={authorImage}
					isDisliked={comment.downvotes.includes(userId)}
					isLiked={comment.upvotes.includes(userId)}
					isAuthorLiked={comment.upvotes.includes(authorId)}
					isAuthorDisLiked={comment.downvotes.includes(authorId)}
					replyLength={comment?.children ? comment?.children.length : 0}
					authorId={authorId}
					currentUserUsername={currentUserUsername}
					currentUserPic={currentUserPic}
				/>
			))}
		</div>
	);
};
export default VideoComments;
