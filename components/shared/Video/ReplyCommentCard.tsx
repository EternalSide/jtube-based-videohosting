"use client";
import {Heart, ThumbsDown, ThumbsUp} from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import Link from "next/link";
import {useState} from "react";
import {
	handleCommentDisLike,
	handleCommentLike,
} from "@/lib/actions/comment.action";
import {usePathname} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import NextImage from "@/components/shared/NextImage";

const ReplyCommentCard = ({
	userName,
	userPicture,
	userId,
	authorId,
	createdAt,
	text,
	upvotes,
	downvotes,
	isAuthorDisLiked,
	authorImage,
	isAuthorLiked,
	commentId,
}: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLiked, setIsLiked] = useState(upvotes.includes(userId));
	const [isDisLiked, setIsDisLiked] = useState(downvotes.includes(userId));

	const [upvotesLength, setUpvotesLength] = useState(upvotes.length);
	const [downvotesLength, setDownvotesLength] = useState(downvotes.length);

	const [isAuthorLikedState, setisAuthorLiked] = useState(isAuthorLiked);
	const [isAuthorDisLikedState, setisAuthorDisLiked] =
		useState(isAuthorDisLiked);

	const isAuthor = userId === authorId;
	const path = usePathname();
	const {toast} = useToast();

	const onClick = async (action: "like" | "dislike") => {
		if (!userId) {
			return toast({title: "Вы не авторизованы", variant: "destructive"});
		}

		setIsLoading(true);
		try {
			if (action === "like") {
				if (isLiked) {
					setIsLiked(false);
					setUpvotesLength(upvotesLength - 1);
					if (isAuthor) {
						setisAuthorLiked(false);
					}
				}
				if (!isLiked) {
					setIsLiked(true);
					setUpvotesLength(upvotesLength + 1);
					if (isAuthor) {
						setisAuthorLiked(true);
					}
				}
				if (isDisLiked) {
					setIsLiked(true);
					setIsDisLiked(false);
					setDownvotesLength(downvotesLength - 1);
					setUpvotesLength(upvotesLength + 1);
					if (isAuthor) {
						setisAuthorLiked(true);
						setisAuthorDisLiked(false);
					}
				}
				await handleCommentLike({
					userId,
					commentId,
					isLiked,
					isDisliked: isDisLiked,
					path,
					videoId: null,
					text,
					notMainComment: true,
				});
			}
			if (action === "dislike") {
				if (isLiked) {
					setIsLiked(false);
					setIsDisLiked(true);
					setDownvotesLength(downvotesLength + 1);
					setUpvotesLength(upvotesLength - 1);
					if (isAuthor) {
						setisAuthorLiked(false);
						setisAuthorDisLiked(true);
					}
				}
				if (!isDisLiked) {
					setIsDisLiked(true);
					setDownvotesLength(downvotesLength + 1);
					if (isAuthor) {
						setisAuthorDisLiked(true);
					}
				}
				if (isDisLiked) {
					setIsDisLiked(false);
					setDownvotesLength(downvotesLength - 1);
					if (isAuthor) {
						setisAuthorDisLiked(false);
					}
				}
				await handleCommentDisLike({
					userId,
					commentId,
					isLiked,
					isDisliked: isDisLiked,
					path,
					videoId: null,
					notMainComment: true,
				});
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col gap-0'>
			<div className='flex gap-3 items-start'>
				<Link href={`/${userName}`}>
					<NextImage
						alt={userName}
						src={userPicture}
						width='w-12'
						height='h-12'
						className='rounded-full object-cover'
					/>
				</Link>
				<div>
					<div className='flex gap-2.5 items-center'>
						<Link
							prefetch={false}
							href={`/${userName}`}
						>
							<h3
								className={`text-sm font-medium ${
									userId === authorId && "bg-indigo-600 px-3 py-1.5 rounded-2xl"
								}`}
							>
								@{userName}
							</h3>
						</Link>
						<p className='text-zinc-400 text-xs'>{createdAt}</p>
					</div>
					<p className='text-[15px] mt-1'>{text}</p>
					<div className='flex items-center gap-3 mt-2'>
						<ActionTooltip
							label='Нравится'
							side='bottom'
						>
							<button
								disabled={isLoading}
								onClick={() => onClick("like")}
								className='flex items-center '
							>
								<div className='hover:bg-zinc-700 transition p-1.5 rounded-full'>
									<ThumbsUp
										fill={isLiked ? "white" : "null"}
										className={`h-[18px] w-[18px] `}
									/>
								</div>
								<p>{upvotesLength}</p>
							</button>
						</ActionTooltip>
						<ActionTooltip
							label='Не нравится'
							side='bottom'
						>
							<button
								onClick={() => onClick("dislike")}
								disabled={isLoading}
								className='flex items-center'
							>
								<div className='hover:bg-zinc-700 transition p-1.5 rounded-full'>
									<ThumbsDown
										fill={isDisLiked ? "white" : "null"}
										className='h-[18px] w-[18px]'
									/>
								</div>
								<p>{downvotesLength}</p>
							</button>
						</ActionTooltip>
						{(isAuthorLikedState || isAuthorDisLikedState) && (
							<ActionTooltip
								side='bottom'
								label={
									isAuthorDisLikedState
										? "👎 Автору не понравился данный комментарий"
										: " 👍 Автор оценил этот комментарий"
								}
							>
								<div className='ml-2.5 relative'>
									<NextImage
										src={authorImage}
										alt=''
										width='w-6'
										height='h-6'
										className='rounded-full object-cover'
									/>

									{isAuthorLikedState ? (
										<Heart
											fill='red'
											className='absolute -bottom-1.5 -right-2 h-4 w-4 text-red-500'
										/>
									) : (
										<ThumbsDown
											fill='red'
											className='absolute -bottom-2 -right-2 h-4 w-4 text-red-500'
										/>
									)}
								</div>
							</ActionTooltip>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ReplyCommentCard;
