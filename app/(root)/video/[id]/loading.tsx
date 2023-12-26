import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className='flex gap-6 2xl:pl-[100px] lg:pl-7 pt-24 pb-12 max-lg:px-0 max-lg:pt-[72px] flex-col w-full'>
			<div className='!w-3/4 max-lg:w-full'>
				<Skeleton className='h-[680px] bg-neutral-900' />
			</div>
			<div className='mt-6 max-lg:px-6'>
				<Skeleton className='w-[400px] h-6 bg-neutral-900 rounded-md' />
				<div className='mt-4 flex justify-between items-center max-[1330px]:flex-col  max-[1330px]:items-start  max-[1330px]:gap-5'>
					<div className='flex gap-3 items-center min-w-[350px]'>
						<Skeleton className='w-[200px] h-6 bg-neutral-900 rounded-md' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Loading;
