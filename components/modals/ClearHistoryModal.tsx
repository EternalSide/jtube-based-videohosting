"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useModal} from "@/hooks/useModal";
import {clearUserHistory} from "@/lib/actions/user.action";
import {toast} from "../ui/use-toast";
import {usePathname} from "next/navigation";

const ClearHistoryModal = () => {
	const {isOpen, setIsOpen, type, data} = useModal();
	const open = type === "clearHistory" && isOpen;
	const path = usePathname();

	const deleteUserHistory = async () => {
		try {
			if (data.historyLength === 0) return toast({title: "История пустая ❌"});

			await clearUserHistory({path, userId: data.userId});

			return toast({title: "История очищена ✅"});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<AlertDialog
			onOpenChange={() => setIsOpen(false, "clearHistory")}
			open={open}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Очистить историю просмотра?</AlertDialogTitle>
					<AlertDialogDescription>
						Ваша история просмотра будет удалена со всех устройств. Отменить это
						действие не предоставляется возможным.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отменить</AlertDialogCancel>
					<AlertDialogAction
						onClick={deleteUserHistory}
						className='bg-indigo-600 text-white disabled:opacity-80'
					>
						Очистить историю
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
export default ClearHistoryModal;
