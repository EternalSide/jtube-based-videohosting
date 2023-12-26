import SearchComponent from "@/components/shared/SearchComponent";
import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className='flex gap-3 max-lg:flex-col-reverse'>
			<div className='flex-1'>
				<div className='flex justify-between items-center w-full'>
					<h1 className='text-3xl font-semibold'>История просмотра</h1>
				</div>
				<div className='grid 2xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-2 mt-6 gap-x-6 gap-y-14'>
					{Array.from({length: 12}, (v, i) => (
						<Skeleton
							key={i + 1}
							className='h-[250px] w-full'
						/>
					))}
				</div>
			</div>
			<div className='lg:w-[330px] w-full max-lg:mx-auto flex items-end max-lg:items-center flex-col gap-3 max-lg:mb-6'>
				<SearchComponent placeholder='Поиск в истории' />
			</div>
		</div>
	);
};
export default Loading;
