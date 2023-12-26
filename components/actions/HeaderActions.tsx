"use client";
import {useModal} from "@/hooks/useModal";
import FollowAction from "./FollowAction";

const HeaderActions = ({
	isFollowing,
	currentUserId,
	isOwnProfile,
	userId,
	name,
	about,
	link,
	clerkId,
}: any) => {
	const {setIsOpen} = useModal();
	const data = {name, about, link, clerkId};

	return (
		<>
			{isOwnProfile ? (
				<button
					onClick={() => setIsOpen(true, "edit", data)}
					className='bg-indigo-700 py-3 px-5 rounded-3xl hover:opacity-90 transition'
				>
					Редактировать
				</button>
			) : (
				<FollowAction
					isFollowing={isFollowing}
					currentUserId={currentUserId}
					userId={userId}
				/>
			)}
		</>
	);
};
export default HeaderActions;
