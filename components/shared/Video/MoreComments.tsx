import {Loader2Icon} from "lucide-react";
import {formatRelativeTime} from "@/lib/utils";
import ReplyCommentCard from "./ReplyCommentCard";

const MoreComments = ({
	isMoreCommentsOpen,
	moreCommentsLoading,
	moreComments,
	authorImage,
	authorId,
	userId,
}: any) => {
	return (
		<div>
			{isMoreCommentsOpen &&
				(moreCommentsLoading ? (
					<div className='w-full'>
						<Loader2Icon className='relative mx-auto my-6 h-10 w-10 animate-spin text-indigo-500' />
					</div>
				) : (
					<div className='flex flex-col gap-4 my-3 ml-16'>
						{moreComments.map((item: any) => (
							<ReplyCommentCard
								key={item._id}
								userName={item.author.username}
								userPicture={item.author.picture}
								userId={userId}
								authorId={authorId}
								createdAt={formatRelativeTime(item.createdAt)}
								text={item.text}
								upvotes={item.upvotes}
								downvotes={item.downvotes}
								isAuthorLiked={item.upvotes.includes(authorId)}
								isAuthorDisLiked={item.downvotes.includes(authorId)}
								authorImage={authorImage}
								commentId={item._id.toString()}
							/>
						))}
					</div>
				))}
		</div>
	);
};
export default MoreComments;
