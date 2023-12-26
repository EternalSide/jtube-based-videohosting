"use client";
import {MoreHorizontal} from "lucide-react";
import {Button} from "../ui/button";
import {useModal} from "@/hooks/useModal";

const OpenPlaylistModalAction = ({
	currentUserId,
	videoId,
	videoPicture,
}: any) => {
	const {setIsOpen} = useModal();

	return (
		<Button
			onClick={() =>
				setIsOpen(true, "addInPlaylist", {
					currentUserId,
					videoId,
					videoPicture,
				})
			}
			className='!rounded-full !px-3'
			variant='video'
		>
			<MoreHorizontal className={`icon_5 `} />
		</Button>
	);
};
export default OpenPlaylistModalAction;
