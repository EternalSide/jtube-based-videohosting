"use client";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import {useSheetSidebar} from "@/hooks/useSheetSidebar";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {menuLinks} from "@/constants";
import {useEffect} from "react";
import NextImage from "@/components/shared/NextImage";

interface Props {
	username: string;
	followingIds: any;
	open?: boolean;
}

const SheetSidebar = ({username, followingIds, open}: Props) => {
	const {isOpen, setIsOpen} = useSheetSidebar();
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<Sheet
			open={isOpen || open}
			onOpenChange={() => setIsOpen(false)}
		>
			<SheetContent
				side='left'
				className='border-neutral-800 w-[320px] p-0 pt-0 pl-5 max-lg:w-[100px] max-lg:px-5 z-[3000]'
			>
				<ScrollArea className='h-full'>
					<div className='border-r border-border w-[320px] pt-[55px] pb-4 max-lg:w-[100px] min-h-screen'>
						<div className='flex flex-col gap-1.5'>
							{menuLinks.map((item: any) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.label}
										href={
											item.label !== "Мой канал"
												? item.href
												: username
												? `/${username}`
												: "/sign-in"
										}
										className={`flex items-center gap-5 px-4 py-3 rounded-full hover:bg-neutral-800 transition ${
											isActive && "bg-neutral-800"
										}`}
									>
										<item.icon className='icon_6 max-lg:icon_6' />
										<p className='text-lg max-lg:hidden'> {item.label}</p>
									</Link>
								);
							})}
						</div>
						<Separator className='mt-3' />

						<div className='mt-5'>
							<h3 className='text-lg pl-4 max-lg:hidden'>Подписки</h3>
							<div className='flex flex-col gap-1.5  mt-3'>
								{followingIds?.length > 0 ? (
									followingIds?.map((user: any) => {
										return (
											<Link
												key={user._id}
												href={`/${user.username}`}
												className='flex items-center gap-5 px-4 py-3 rounded-xl hover:bg-neutral-800 transition'
											>
												<NextImage
													src={user.picture}
													alt={user.username}
													width='w-[27px]'
													height='h-[27px]'
													className='rounded-full object-cover'
												/>

												<p className='text-lg line-clamp-1 max-lg:hidden'>
													{user.name}
												</p>
											</Link>
										);
									})
								) : (
									<div className='pl-4 text-zinc-400 max-lg:hidden'>
										Ничего не найдено.
									</div>
								)}
							</div>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};
export default SheetSidebar;
