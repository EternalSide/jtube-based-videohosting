"use client";
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import {getWatchedHistory} from "@/lib/actions/user.action";
import VideoCardMe from "../cards/VideoCardMe";
import {Skeleton} from "../ui/skeleton";
import VideoRecommended from "../cards/VideoRecommended";
import {
	getAllVideos,
	getMoreVideos,
	getTopVideos,
} from "@/lib/actions/video.action";
import {Loader2Icon} from "lucide-react";
import VideoCardMain from "../cards/VideoCardMain";
import {formatDate} from "@/lib/utils";

interface Props {
	videos: any;
	page: string;
	userId?: string;
	containerClassNames: string;
	loadingClassNames?: string;
	skeletonLength?: number;
	skeletonClassNames?: string;
	loadingIcon?: boolean;
}

const InfiniteScroll = ({
	videos,
	page,
	userId,
	containerClassNames,
	loadingClassNames,
	skeletonLength,
	skeletonClassNames,
	loadingIcon,
}: Props) => {
	const {ref, inView} = useInView();
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [initialVideos, setInitialVideos] = useState([...videos]);

	useEffect(() => {
		if (inView) {
			loadData();
		}
	}, [inView]);

	const loadData = async () => {
		try {
			const nextPage = currentPage + 1;

			let videos: any = [];

			switch (page) {
				case "historyPage": {
					// @ts-ignore
					const {history} = await getWatchedHistory({page: nextPage, userId});
					videos = history;
					break;
				}

				case "recommended": {
					const data = await getMoreVideos({page: nextPage});
					videos = data;
					break;
				}

				case "topPage": {
					const data = await getTopVideos({page: nextPage});
					videos = data;
					break;
				}

				case "all": {
					const data = await getAllVideos({page: 1});
					videos = data;
					break;
				}
				default:
					break;
			}

			if (videos?.length) {
				setCurrentPage(nextPage);
				setInitialVideos((prev: any) => {
					setHasMore(true);
					return [...(prev?.length ? prev : []), ...videos];
				});
			} else {
				setHasMore(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	// На разных страницах могут быть разные компоненты.
	const renderComponent = (data: any) => {
		switch (page) {
			case "historyPage": {
				return (
					<VideoCardMe
						id={data._id.toString()}
						authorImg={data.author.picture}
						authorName={data.author.username}
						date={data.createdAt}
						title={data.video_title}
						videoImg={data.videoPreviewUrl}
						views={data.views}
					/>
				);
			}

			case "recommended": {
				return <VideoRecommended item={data} />;
			}

			case "topPage": {
				return (
					<VideoCardMe
						id={data._id.toString()}
						authorImg={data.author.picture}
						authorName={data.author.username}
						date={data.createdAt}
						title={data.video_title}
						videoImg={data.videoPreviewUrl}
						views={data.views}
					/>
				);
			}

			case "all": {
				return (
					<VideoCardMain
						video_title={data.video_title}
						date={formatDate(data.createdAt)}
						authorName={data.author.username}
						authorImage={data.author.picture}
						videoPreviewUrl={data.videoPreviewUrl}
						videoUrl={data._id.toString()}
					/>
				);
			}

			default:
				break;
		}
	};

	return (
		<>
			<div className={containerClassNames}>
				{initialVideos.map((data: any) => (
					<div key={data._id}>{renderComponent(data)}</div>
				))}
			</div>
			{hasMore && (
				<div
					ref={ref}
					className={loadingClassNames}
				>
					{loadingIcon ? (
						<Loader2Icon className='relative mx-auto my-4 h-10 w-10 animate-spin text-indigo-500' />
					) : (
						Array.from({length: skeletonLength!}, (_, i) => (
							<Skeleton
								key={i + 1}
								className={
									skeletonClassNames ? skeletonClassNames : "h-[200px] w-full"
								}
							/>
						))
					)}
				</div>
			)}
		</>
	);
};
export default InfiniteScroll;
