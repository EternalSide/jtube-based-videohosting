import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<>
			<h1 className='text-3xl font-semibold'>Мои подписки</h1>
			<div className='videos-container'>
				{Array.from({length: 12}, (v, i) => (
					<Skeleton
						key={i + 1}
						className='h-[250px] w-full'
					/>
				))}
			</div>
		</>
	);
};
export default Loading;
