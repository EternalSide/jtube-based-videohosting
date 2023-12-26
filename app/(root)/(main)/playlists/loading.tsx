import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>Мои плейлисты</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Плейлисты, которые вы создали.
			</p>
			<div className='grid 2xl:grid-cols-5 lg:grid-cols-2 md:grid-cols-2 mt-6 gap-x-6 gap-y-14'>
				{Array.from({length: 20}, (v, i) => (
					<Skeleton
						key={i + 1}
						className='h-[350px]'
					/>
				))}
			</div>
		</div>
	);
};
export default Loading;
