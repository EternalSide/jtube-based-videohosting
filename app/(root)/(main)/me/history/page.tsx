import InfiniteScroll from "@/components/shared/InfiniteScroll";
import ClearUserHistory from "@/components/actions/ClearUserHistory";
import SaveHistory from "@/components/actions/SaveHistory";
import SearchComponent from "@/components/shared/SearchComponent";
import {getWatchedHistory} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: {
		absolute: "История / JTUBE",
	},
};

interface Props {
	searchParams: {
		[key: string]: string | undefined;
	};
}

const WatchedHistory = async ({searchParams}: Props) => {
	const {userId} = auth();
	// @ts-ignore
	const {history, id, isSavingHistory} = await getWatchedHistory({
		userId: userId!,
		searchParams: searchParams?.q ? searchParams.q : "",
		page: 1,
	});

	return (
		<div className='flex gap-3 max-lg:flex-col-reverse'>
			<div className='flex-1'>
				<div className='flex justify-between items-center w-full max-lg:flex-col max-lg:items-start max-lg:gap-3'>
					<h1 className='text-3xl font-semibold'>История просмотра</h1>
					<SearchComponent placeholder='Поиск в истории' />
				</div>
				<div className='flex items-center justify-center max-sm:flex-col max-sm:items-start max-lg:gap-1.5 gap-6'>
					<ClearUserHistory
						historyLength={history.length}
						userId={id}
					/>
					<SaveHistory
						isSavingHistory={isSavingHistory}
						userId={id}
					/>
				</div>
				{isSavingHistory ? (
					history.length > 0 ? (
						<InfiniteScroll
							videos={history}
							page='historyPage'
							userId={userId!}
							containerClassNames='videos-container'
							loadingIcon={true}
							loadingClassNames='my-10'
						/>
					) : (
						<div className='mt-6 text-zinc-400'>Ничего не найдено.</div>
					)
				) : (
					<div className='mt-6 text-zinc-400'>История не сохраняется.</div>
				)}
			</div>
			{/* <div className='lg:w-[330px] w-full max-lg:mx-auto flex items-end max-lg:items-center flex-col gap-3 max-lg:mb-6'>
				<SearchComponent placeholder='Поиск в истории' />
				<div className='flex flex-col items-end max-lg:items-center max-lg:flex-row max-sm:flex-col max-sm:items-start max-sm:mr-auto'>
					<ClearUserHistory
						historyLength={history.length}
						userId={id}
					/>
					<SaveHistory
						isSavingHistory={isSavingHistory}
						userId={id}
					/>
				</div>
			</div> */}
		</div>
	);
};
export default WatchedHistory;
