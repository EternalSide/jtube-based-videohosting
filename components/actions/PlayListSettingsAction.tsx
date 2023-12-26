"use client";

import {deletePlaylist} from "@/lib/actions/playlist.action";
import {X} from "lucide-react";
import {usePathname} from "next/navigation";
import {toast} from "../ui/use-toast";

const PlayListSettingsAction = ({playlistId, userId}: any) => {
	const path = usePathname();

	const onClick = async (e: any) => {
		e.preventDefault();
		try {
			await deletePlaylist({
				path,
				playlistId,
				userId,
			});

			return toast({
				title: "Плейлист удален ✅",
			});
		} catch (e) {
			return toast({
				title: "Что-то пошло не так>",
				variant: "destructive",
			});
		}
	};

	return (
		<button onClick={onClick}>
			<X className='hover:opacity-80 transition text-red-500' />
		</button>
	);
};
export default PlayListSettingsAction;
