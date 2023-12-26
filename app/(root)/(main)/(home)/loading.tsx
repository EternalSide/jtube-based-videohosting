import {Skeleton} from "@/components/ui/skeleton";
import {ChevronRight} from "lucide-react";
import Link from "next/link";

const Loading = () => {
	return (
		<div className='pb-6 relative'>
			<Skeleton className='w-full h-[320px]' />
			<div className='px-5'>
				<div className='mt-14 px-2'>
					<div className='w-fit'>
						<Link href='/top'>
							<h3 className='font-semibold text-4xl'>
								<span className='text-indigo-500 '>Топ-3</span> видео
								<ChevronRight className='inline h-10 w-10' />
							</h3>
						</Link>
					</div>
					<div className='grid 2xl:grid-cols-3 md:grid-cols-2 mx-auto gap-6 px-3 mt-8'>
						{Array.from({length: 3}, (v, i) => (
							<div
								key={i}
								className='flex gap-2 items-start'
							>
								<h3 className='font-bold text-[134px] leading-none -mt-4 text-indigo-400'>
									{i + 1}
								</h3>
								<Skeleton
									key={i + 1}
									className='h-[230px] w-full'
								/>
							</div>
						))}
					</div>
				</div>
				<div className='mt-14 px-2'>
					<div>
						<h3 className='font-semibold text-4xl'>
							Новые видео
							<ChevronRight className='inline h-10 w-10' />
						</h3>
					</div>
					<div className='grid 2xl:grid-cols-4 md:grid-cols-2 mx-auto gap-6 px-3 mt-6'>
						{Array.from({length: 8}, (v, i) => (
							<Skeleton
								key={i + 1}
								className='h-[230px] w-full'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Loading;
