import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>В топе</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Видео, которые мы посчитали самыми рейтинговыми за неделю.
			</p>

			<div className='videos-container'>
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
