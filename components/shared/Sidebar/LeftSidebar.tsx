"use client";
import Link from "next/link";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {IUser} from "@/database/models/user.model";
import {usePathname} from "next/navigation";
import {menuLinks} from "@/constants";
import {MenuLink} from "@/constants/types/index.shared";
import NextImage from "@/components/shared/NextImage";

interface Props {
	username: string;
	followings: Partial<IUser>[] | null;
}

const LeftSidebar = ({username, followings}: Props) => {
	const pathname = usePathname();

	return (
		<ScrollArea className='!fixed h-full z-[25] bg-black max-sm:hidden'>
			<div className='px-5  border-r border-border w-[280px] pt-[95px] pb-4 max-lg:w-[100px] min-h-screen'>
				<div className='flex flex-col gap-1.5'>
					{menuLinks.map((item: MenuLink) => {
						const isActive =
							item.label !== "Мой канал"
								? pathname === item.href
								: pathname.slice(1) === username;
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
								className={`flex items-center gap-5 px-4 max-lg:justify-center py-3 rounded-xl hover:bg-neutral-800 transition ${
									isActive && "bg-neutral-800"
								}`}
							>
								<item.icon className='icon_4 max-lg:icon_6' />
								<p className='text-[15px] max-lg:hidden'>{item.label}</p>
							</Link>
						);
					})}
				</div>

				<Separator className='mt-3' />

				<div className='mt-5'>
					<h3 className='text-lg pl-4 max-lg:hidden'>Подписки</h3>
					<div className='flex flex-col gap-1.5  mt-3'>
						{followings && followings?.length > 0 ? (
							followings?.map((user: any) => {
								const isActive = pathname.slice(1) === user.username;
								return (
									<Link
										key={user._id}
										href={`/${user.username}`}
										className={`flex items-center gap-5 px-4 py-3 rounded-xl hover:bg-neutral-800 transition ${
											isActive && "bg-neutral-800"
										}`}
									>
										<NextImage
											src={user.picture}
											alt={user.username}
											width='w-[27px]'
											height='h-[27px]'
											className='rounded-full object-cover'
										/>

										<p className='text-[15px] line-clamp-1 max-lg:hidden'>
											{user.name}
										</p>
									</Link>
								);
							})
						) : (
							<div className='text-center text-zinc-400'>
								Ничего не найдено.
							</div>
						)}
					</div>
				</div>
			</div>
		</ScrollArea>
	);
};
export default LeftSidebar;
