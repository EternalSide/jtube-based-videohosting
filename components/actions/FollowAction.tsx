"use client";
import {useOptimistic, useState} from "react";
import {handleFollowUser} from "@/lib/actions/user.action";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "../ui/button";
import {toast} from "../ui/use-toast";

interface Props {
	isFollowing: boolean;
	currentUserId: string;
	userId: string;
	classNames?: string;
}

const FollowAction = ({
	isFollowing,
	currentUserId,
	userId,
	classNames,
}: Props) => {
	const [optimisticFollowing, addOptimisticFollowing] =
		useOptimistic(isFollowing);
	const [loading, setIsLoading] = useState(false);
	const path = usePathname();

	const handleFollowAction = async () => {
		if (!currentUserId)
			return toast({
				title: "Вы не авторизованы",
			});

		addOptimisticFollowing((current: boolean) => !current);

		try {
			if (loading) return;

			setIsLoading(true);

			await handleFollowUser({isFollowing, userId, currentUserId, path});
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant='video'
			onClick={handleFollowAction}
			className={cn(
				classNames,
				optimisticFollowing
					? "bg-neutral-800 text-white"
					: "bg-indigo-600 hover:bg-indigo-700"
			)}
		>
			{optimisticFollowing === true ? "Вы подписаны ✓" : "Подписаться"}
		</Button>
	);
};
export default FollowAction;
