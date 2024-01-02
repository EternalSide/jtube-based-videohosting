"use client";
import {Bookmark} from "lucide-react";
import ActionTooltip from "../shared/ActionTooltip";
import {Button} from "../ui/button";
import {usePathname} from "next/navigation";
import {useOptimistic, useState} from "react";
import {handleAddToWatchedList} from "@/lib/actions/user.action";
import {toast} from "../ui/use-toast";

interface Props {
	inWatchedList: boolean;
	currentUserId: string | undefined;
	videoId: string;
}

const WatchLaterAction = ({inWatchedList, currentUserId, videoId}: Props) => {
	const [optimisticInWatchedL, addoptimisticInWatchedL] =
		useOptimistic(inWatchedList);

	const [loading, setIsLoading] = useState(false);
	const path = usePathname();

	const handleWatchLater = async () => {
		if (!currentUserId)
			return toast({
				title: "Вы не авторизованы",
				variant: "destructive",
			});
		toast({
			description: optimisticInWatchedL
				? "Видео удалено из 'Смотреть позже' ✅"
				: "Видео добавлено в 'Смотреть позже' ✅",
		});
		addoptimisticInWatchedL((current: boolean) => !current);

		try {
			if (loading) return;

			setIsLoading(true);

			await handleAddToWatchedList({
				inWatchedList,
				currentUserId,
				path,
				videoId,
			});

			return;
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ActionTooltip
			side='bottom'
			align='center'
			label='Смотреть позже'
			classNames='mt-2'
		>
			<Button
				className='min-w-[200px] !justify-start !gap-3'
				onClick={handleWatchLater}
				variant='video'
			>
				<Bookmark
					fill={optimisticInWatchedL ? "white" : "none"}
					className={`icon_5 ${optimisticInWatchedL && "text-white"}`}
				/>
				Смотреть позже
			</Button>
		</ActionTooltip>
	);
};
export default WatchLaterAction;
