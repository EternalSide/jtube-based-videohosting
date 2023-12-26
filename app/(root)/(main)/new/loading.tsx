import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>Новые</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Видео, которые были опубликованы недавно.
			</p>

			<div className='grid 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 mt-6 gap-x-6 gap-y-14'>
				{Array.from({length: 12}, (v, i) => (
					<Skeleton
						key={i + 1}
						className='h-[230px] w-full'
					/>
				))}
			</div>
		</div>
	);
};
export default Loading;
