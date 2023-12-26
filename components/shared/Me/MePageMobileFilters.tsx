"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {useRouter} from "next/navigation";

const MePageMobileFilters = () => {
	const router = useRouter();

	return (
		<div className='mt-3 md:hidden'>
			<Select
				defaultValue='/me'
				onValueChange={(value: string) => router.push(value)}
			>
				<SelectTrigger>
					<SelectValue placeholder='Выберите категорию' />
				</SelectTrigger>

				<SelectContent
					onChange={(e: any) => alert(e)}
					className='py-0'
				>
					<SelectItem
						onClick={() => alert(123)}
						value='/me'
					>
						Смотреть позже
					</SelectItem>

					<SelectItem
						onClick={() => router.push("/me/subcriptions")}
						value='/me/subcriptions'
					>
						Подписки
					</SelectItem>

					<SelectItem
						onClick={() => router.push("/me/history")}
						value='/me/history'
					>
						История
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
export default MePageMobileFilters;
