"use client";
import {Video} from "lucide-react";
import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import ActionTooltip from "@/components/shared/ActionTooltip";
import GlobalSearch from "./GlobalSearch";
import NavbarLogo from "./NavbarLogo";
import SidebarActions from "../Sidebar/SidebarActions";
import {useOverlay} from "@/hooks/useOverlay";
import {cn} from "@/lib/utils";
import Notifications from "./Notifications";

const Navbar = ({notifications}: any) => {
	const {isOverlayOpen} = useOverlay();

	return (
		<header
			className={cn(
				"bg-black h-[72px] px-7 max-lg:px-6 max-sm:pl-3 max-sm:pr-5 flex justify-between items-center w-full fixed z-[1002] border-b border-border",
				isOverlayOpen && "z-[100]"
			)}
		>
			<div className='flex items-center gap-2'>
				<SidebarActions />
				<NavbarLogo />
			</div>

			<GlobalSearch />

			<div className='flex gap-4 items-center'>
				<SignedIn>
					<ActionTooltip label='Загрузить'>
						<Link
							href='/upload'
							className='transition hover:bg-neutral-800 hover:opacity-90 p-2 rounded-full  flex-center'
						>
							<Video className='icon_6' />
						</Link>
					</ActionTooltip>
					<Notifications notifications={notifications} />
					<UserButton afterSignOutUrl='/' />
				</SignedIn>

				<SignedOut>
					<Link href={"/sign-in"}>
						<button className='text-sm rounded-[8px] bg-indigo-700 py-2.5 px-3 transition hover:bg-indigo-600'>
							Вход и регистрация
						</button>
					</Link>
				</SignedOut>
			</div>
		</header>
	);
};
export default Navbar;
