"use client";
import {ThumbsDown, ThumbsUpIcon} from "lucide-react";
import ActionTooltip from "../shared/ActionTooltip";
import {Button} from "../ui/button";
import {usePathname} from "next/navigation";
import {handleLikeAction} from "@/lib/actions/video.action";
import {toast} from "../ui/use-toast";

interface Props {
	currentUserId: string;
	videoId: string;
	upVotesLength: number;
	downVotesLength: number;
	isLiked: boolean;
	isDisliked: boolean;
}

const LikeAction = ({
	upVotesLength,
	downVotesLength,
	currentUserId,
	isLiked,
	isDisliked,
	videoId,
}: Props) => {
	const path = usePathname();

	const onClick = async (type: "like" | "dislike") => {
		try {
			if (!currentUserId) {
				return toast({
					title: "Войдите, чтобы оценить видео",
					variant: "destructive",
				});
			}

			await handleLikeAction({
				path,
				currentUserId,
				videoId,
				type,
				isLiked,
				isDisliked,
			});

			if (!isDisliked && !isLiked) {
				return toast({
					description: "Отметка добавлена ✅",
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='bg-neutral-800 flex items-center rounded-2xl'>
			<ActionTooltip
				side='bottom'
				align='center'
				label='Нравится'
				classNames='mt-2'
			>
				<Button
					onClick={() => onClick("like")}
					variant='video'
				>
					<ThumbsUpIcon
						fill={isLiked ? "white" : "none"}
						className={`icon_5 ${isLiked && "text-white"}`}
					/>
					{upVotesLength}
				</Button>
			</ActionTooltip>
			<p className='text-zinc-500'>|</p>
			<ActionTooltip
				side='bottom'
				align='center'
				label='Не нравится'
				classNames='mt-2'
			>
				<Button
					onClick={() => onClick("dislike")}
					variant='video'
				>
					<ThumbsDown
						fill={isDisliked ? "white" : "none"}
						className={`icon_5 text-zinc-300 ${isDisliked && "!text-white"}`}
					/>
					{downVotesLength}
				</Button>
			</ActionTooltip>
		</div>
	);
};
export default LikeAction;
