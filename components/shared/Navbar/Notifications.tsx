"use client";
import {Bell} from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import {useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import {useOutSideClick} from "shinigami";

const Notifications = ({notifications}: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	useOutSideClick({
		containerRef,
		dependencies: [containerRef, pathname],
		setIsOpen,
		functionAfterCondition: () => {
			setIsOpen(false);
		},
	});

	const generatePComponent = (type: string, item: any) => {
		if (type === "video_comment") {
			return (
				<p className='max-w-[200px] text-sm leading-relaxed'>
					<span className='font-semibold'>💬 {item.user.name}</span> оставил вам
					новый комментарий:{" "}
					{item?.text && item.text.length > 80
						? item.text.slice(0, 80) + "..."
						: item.text}
				</p>
			);
		}
		if (type === "video_like") {
			return (
				<p className='max-w-[200px] text-sm'>
					<span className='font-semibold'>👍 {item.user.name}</span> оценил ваше
					видео: {item.video.video_title}
				</p>
			);
		}
		if (type === "comment_like") {
			return (
				<p className='max-w-[200px] text-sm'>
					<span className='font-semibold'>👍 {item.user.name}</span> оценил ваш
					комментарий:{" "}
					{item?.text && item.text && item.text.length > 80
						? item.text.slice(0, 80) + "..."
						: item.text}
				</p>
			);
		}
	};

	return (
		<div ref={containerRef}>
			<ActionTooltip
				label='Уведомления'
				classNames={`!relative ${isOpen && "hidden"}`}
			>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={
						"transition hover:bg-neutral-800 hover:opacity-90 p-2 rounded-full flex-center"
					}
				>
					<Bell
						fill={isOpen ? "white" : ""}
						className='icon_6'
					/>
				</button>
			</ActionTooltip>

			<div className='max-w-[400px] w-full'>
				{isOpen && (
					<div className='absolute top-full z-[3001] py-4 -ml-[400px] w-[470px] max-lg:w-[350px] max-lg:-ml-[300px] pb-0 -mt-4 bg-neutral-900 shadow-sm shadow-black rounded-xl'>
						<div className='space-y-5 '>
							<div className='flex flex-col'>
								<h3 className='px-5 font-semibold text-zinc-200 text-lg pb-4'>
									Уведомления
								</h3>
								<div className='border-b border-zinc-800 z-[3000] ' />
								<ScrollArea className='h-[400px] z-[3000]'>
									{notifications && notifications?.length > 0 ? (
										notifications.map((item: any) => (
											<Link
												key={item._id}
												href={`/video/${item?.video._id || "/"}`}
												className='mt-0 flex justify-between items-start hover:bg-neutral-800 transition p-5'
											>
												<div className='flex items-start gap-2.5 flex-1'>
													<div className='h-[64px] w-[64px] relative'>
														<Image
															src={item.user.picture || "/nouser.png"}
															alt={item.video.video_title}
															fill
															className='object-cover rounded-full'
														/>
													</div>

													<div className='pr-1 mt-0.5s'>
														{generatePComponent(item.type, item)}
													</div>
												</div>
												<Image
													src={item.video.videoPreviewUrl}
													alt={item.video.video_title}
													width={100}
													height={100}
												/>
											</Link>
										))
									) : (
										<div className='text-center flex justify-center items-center min-h-[256px] z-[1000]'>
											<p className='text-neutral-400'>Ничего не найдено.</p>
										</div>
									)}
								</ScrollArea>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default Notifications;
