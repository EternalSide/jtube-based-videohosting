"use client";
import {Trash} from "lucide-react";
import {Button} from "../ui/button";
import {useModal} from "@/hooks/useModal";

interface Props {
	userId: string;
	historyLength: number;
}

const ClearUserHistory = ({userId, historyLength}: Props) => {
	const {setIsOpen} = useModal();

	return (
		<Button
			onClick={() => setIsOpen(true, "clearHistory", {userId, historyLength})}
			className='text-zinc-200 gap-2.5 hover:bg-neutral-800 rounded-xl'
		>
			<Trash />
			Очистить историю
		</Button>
	);
};
export default ClearUserHistory;
