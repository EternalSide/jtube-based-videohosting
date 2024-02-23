"use client";
import {
	ChevronDown,
	ChevronUpIcon,
	Heart,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import {useToast} from "@/components/ui/use-toast";
import {
	getMoreComments,
	handleCommentDisLike,
	handleCommentLike,
} from "@/lib/actions/comment.action";
import {usePathname} from "next/navigation";
import {useState} from "react";
import ActionTooltip from "../ActionTooltip";
import {Button} from "@/components/ui/button";
import VideoCommentForm from "./VideoCommentForm";
import MoreComments from "./MoreComments";
import NextImage from "@/components/shared/NextImage";

interface Props {
	userPicture: string;
	userName: string;
	text: string;
	createdAt: string;
	upvotesLength: number;
	downVotesLength: number;
	userId: string;
	videoId?: string;
	id: string;
	authorImage: string;
	isAuthorLiked: boolean;
	isAuthorDisLiked: boolean;
	isLiked: boolean;
	isDisliked: boolean;
	replyLength?: number;
	authorId?: string;
	currentUserUsername: string;
	currentUserPic: string;
}

const CommentCard = ({
	userPicture,
	userName,
	createdAt,
	text,
	upvotesLength,
	downVotesLength,
	userId,
	id,
	isLiked,
	isDisliked,
	authorImage,
	isAuthorLiked,
	isAuthorDisLiked,
	videoId,
	replyLength,
	authorId,
	currentUserUsername,
	currentUserPic,
}: Props) => {
	const {toast} = useToast();
	const path = usePathname();
	const [isLoading, setIsLoading] = useState(false);
	const [isOpenReply, setIsOpenReply] = useState(false);
	const [moreComments, setMoreComments] = useState([]);
	const [moreCommentsLoading, setMoreCommentsLoading] = useState(false);
	const [isMoreCommentsOpen, setIsMoreCommentsOpen] = useState(false);

	const onClick = async (action: "like" | "dislike") => {
		try {
			setIsLoading(true);

			if (!userId) {
				return toast({
					title: "Вы не авторизованы",
					variant: "destructive",
				});
			}
			if (action === "like") {
				await handleCommentLike({
					userId,
					commentId: id,
					isLiked,
					isDisliked,
					path,
					videoId,
					text,
				});
			}

			if (action === "dislike") {
				await handleCommentDisLike({
					userId,
					commentId: id,
					isLiked,
					isDisliked,
					path,
				});
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoadMoreComments = async () => {
		setMoreCommentsLoading(true);
		try {
			const data = await getMoreComments({commentId: id});

			if (data?.length > 0) {
				setMoreComments(data);
			}
		} catch (e) {
		} finally {
			setMoreCommentsLoading(false);
		}
	};

	const prepareLoading = async () => {
		setIsMoreCommentsOpen(!isMoreCommentsOpen);
		if (!isMoreCommentsOpen) {
			await handleLoadMoreComments();
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
							<h3 className='text-sm font-medium'>@{userName}</h3>
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
										fill={isDisliked ? "white" : "null"}
										className='h-[18px] w-[18px]'
									/>
								</div>
								<p>{downVotesLength}</p>
							</button>
						</ActionTooltip>
						{(isAuthorLiked || isAuthorDisLiked) && (
							<ActionTooltip
								side='bottom'
								label={
									isAuthorDisLiked
										? "👎 Автору не понравился данный комментарий"
										: " 👍 Автор оценил этот комментарий"
								}
							>
								<div className='ml-2.5 relative'>
									<NextImage
										alt=''
										src={authorImage}
										width='w-6'
										height='h-6'
										className='rounded-full object-cover'
									/>

									{isAuthorLiked ? (
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
						<Button
							onClick={() => setIsOpenReply(true)}
							className='hover:bg-neutral-800 rounded-3xl'
						>
							<p className='font-medium text-white text-sm'>Ответить</p>
						</Button>
					</div>
				</div>
			</div>
			{/* @ts-ignore */}
			{replyLength > 0 && (
				<button
					onClick={prepareLoading}
					className='ml-16 text-sm rounded-3xl p-3 flex items-center gap-3 w-fit'
				>
					{isMoreCommentsOpen ? (
						<ChevronDown className='icon_5 text-indigo-500' />
					) : (
						<ChevronUpIcon className='icon_5 text-indigo-500' />
					)}
					<p className='text-indigo-500 font-medium'>
						{isMoreCommentsOpen ? "Скрыть ответы" : "Посмотреть ответы"} (
						{replyLength})
					</p>
				</button>
			)}
			<MoreComments
				isMoreCommentsOpen={isMoreCommentsOpen}
				moreComments={moreComments}
				moreCommentsLoading={moreCommentsLoading}
				authorImage={authorImage}
				authorId={authorId}
				userId={userId}
			/>
			{isOpenReply && (
				<VideoCommentForm
					type='comment'
					commentId={id}
					userId={userId}
					setIsOpenReply={setIsOpenReply}
					setMoreComments={setMoreComments}
					userName={currentUserUsername}
					currentUserPic={currentUserPic}
				/>
			)}
		</div>
	);
};
export default CommentCard;
