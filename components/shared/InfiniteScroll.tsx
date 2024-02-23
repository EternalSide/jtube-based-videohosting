"use client";
import {Loader2Icon} from "lucide-react";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {Skeleton} from "../ui/skeleton";
import VideoCardMe from "../cards/VideoCardMe";
import VideoCardMain from "../cards/VideoCardMain";
import {formatDate} from "@/lib/utils";
import {getAllVideos, getTopVideos} from "@/lib/actions/video.action";

interface Props {
	initialVideos: any;
	page: string;
	containerClassNames?: string;
	skeletonClassNames?: string;
	loadingClassNames?: string;
	skeletonLength?: number;
	loadingIcon?: boolean;
}
const InfiniteScroll = ({
	initialVideos,
	page,
	containerClassNames,
	loadingClassNames,
	skeletonLength,
	skeletonClassNames,
	loadingIcon,
}: Props) => {
	const {ref, inView} = useInView();
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [videos, setVideos] = useState([...initialVideos]);

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
				case "topPage": {
					const data = await getTopVideos({page: nextPage});
					videos = data;
				}

				case "all": {
					const data = await getAllVideos({page: nextPage});
					videos = data;
				}

				default:
					break;
			}

			if (videos?.length) {
				setCurrentPage(nextPage);
				setVideos((prev: any) => {
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

	const renderComponent = (data: any) => {
		switch (page) {
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
				{videos.map((item: any) => (
					<div key={item._id}>{renderComponent(item)}</div>
				))}
			</div>
			{hasMore && (
				<div
					className={loadingClassNames}
					ref={ref}
				>
					{loadingIcon ? (
						<Loader2Icon className='relative mx-auto my-4 h-10 w-10 animate-spin text-indigo-500' />
					) : (
						<>
							{Array.from({length: skeletonLength!}, (_, i) => (
								<Skeleton
									key={i + 1}
									className={
										skeletonClassNames ? skeletonClassNames : "h-[200px] w-full"
									}
								/>
							))}
						</>
					)}
				</div>
			)}
		</>
	);
};
export default InfiniteScroll;
