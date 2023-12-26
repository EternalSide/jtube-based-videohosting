"use client";
import {useSheetSidebar} from "@/hooks/useSheetSidebar";
import {Menu} from "lucide-react";
import {usePathname} from "next/navigation";

const SidebarActions = () => {
	const pathname = usePathname();
	const {setIsOpen} = useSheetSidebar();

	if (pathname.includes("video")) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				className='navbar__menu-button'
			>
				<Menu className='icon_8' />
			</button>
		);
	}

	return (
		<button
			onClick={() => setIsOpen(true)}
			className='navbar__menu-button sm:hidden'
		>
			<Menu className='icon_6 ' />
		</button>
	);
};
export default SidebarActions;
