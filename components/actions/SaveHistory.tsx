"use client";
import {InfinityIcon} from "lucide-react";
import {Button} from "../ui/button";
import {usePathname} from "next/navigation";
import {handleUserHistory} from "@/lib/actions/user.action";

const SaveHistory = ({isSavingHistory, userId}: {isSavingHistory: boolean; userId: string}) => {
	const path = usePathname();
	const onClick = async () => {
		try {
			await handleUserHistory({
				path,
				userId,
				isSavingHistory,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Button
			onClick={onClick}
			className='text-zinc-200 gap-2.5 hover:bg-neutral-800 rounded-xl'
		>
			<InfinityIcon />
			{isSavingHistory ? "Не сохранять историю" : "Сохранять историю"}
		</Button>
	);
};
export default SaveHistory;
