import Link from "next/link";
import NextImage from "@/components/shared/NextImage";

const SearchCard = ({item}: any) => {
	return (
		<Link
			className={
				"flex w-full cursor-pointer items-start gap-3 px-6 py-2.5 hover:bg-zinc-800"
			}
			href={item.href}
		>
			<div className='flex items-start gap-3'>
				{item.type === "Пользователь" ? (
					<NextImage
						alt={""}
						src={item.picture}
						width=' w-16'
						height='h-14'
						className='rounded-full object-cover'
					/>
				) : (
					<NextImage
						alt={item.title}
						src={item.videoPreviewUrl}
						width='min-w-[64px] max-w-[64px]'
						height='h-14'
						className='rounded-md object-cover'
					/>
				)}
				<div className='flex flex-col'>
					<p className='line-clamp-1'>{item.title}</p>
					<p className='mt-2 font-medium capitalize text-neutral-400'>
						{item.type}
					</p>
				</div>
			</div>
		</Link>
	);
};
export default SearchCard;
