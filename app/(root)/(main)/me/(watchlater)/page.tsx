import VideoCardMe from "@/components/cards/VideoCardMe";
import NotFound from "@/components/shared/NotFound";
import {getSavedVideos} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";
import {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
	title: {
		absolute: "Смотреть позже / JTUBE",
	},
};

const WatchLater = async () => {
	const {userId} = auth();
	if (!userId) return redirect("/sign-in");

	const savedVideos = await getSavedVideos({userId});

	return (
		<>
			<h1 className='text-3xl font-semibold'>Смотреть позже</h1>
			<div className='videos-container'>
				{savedVideos?.length > 0 ? (
					savedVideos.reverse().map((video: any) => (
						<VideoCardMe
							key={video._id}
							id={video._id.toString()}
							authorImg={video.author.picture}
							authorName={video.author.username}
							date={video.createdAt}
							title={video.video_title}
							videoImg={video.videoPreviewUrl}
							views={video.views}
						/>
					))
				) : (
					<NotFound />
				)}
			</div>
		</>
	);
};
export default WatchLater;
