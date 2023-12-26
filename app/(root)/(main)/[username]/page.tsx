import FilterVideos from "@/components/shared/User/FilterVideos";
import UserBanner from "@/components/shared/User/UserBanner";
import UserHeader from "@/components/shared/User/UserHeader";
import {Separator} from "@/components/ui/separator";
import {getUserById, getUserByUsername} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";
import SearchComponent from "@/components/shared/SearchComponent";
import UserVideos from "@/components/shared/User/UserVideos";
import UserNotFound from "@/components/shared/UserNotFound";

export async function generateMetadata({params}: {params: {username: string}}) {
	const user = await getUserByUsername({
		username: params.username,
	});

	if (!user) {
		return {
			title: `Пользователь не найден / JTUBE`,
		};
	}

	return {
		title: `${user?.name} / JTUBE`,
	};
}
interface ProfilePageProps {
	params: {
		username: string;
	};
	searchParams: {
		[key: string]: string | undefined;
	};
}

const ProfilePage = async ({params, searchParams}: ProfilePageProps) => {
	const {userId} = auth();
	const currentUser = await getUserById(userId!);

	const user = await getUserByUsername({
		username: params.username,
		sortOptions: searchParams?.sort,
		searchQuery: searchParams?.q,
	});

	if (!user) return <UserNotFound />;

	const isOwnProfile = userId && user?.clerkId === userId;
	const isFollowing =
		!isOwnProfile && user.followers.includes(currentUser?._id);

	return (
		<>
			<UserBanner
				userId={currentUser?._id.toString()}
				isOwnProfile={Boolean(isOwnProfile)}
				background={user?.background}
			/>
			<div className='max-w-[1350px] px-10 w-full mx-auto pb-10 min-h-screen'>
				<UserHeader
					user={user}
					currentUserId={currentUser?._id.toString()}
					isOwnProfile={isOwnProfile}
					isFollowing={isFollowing}
				/>
				<Separator className='mt-10' />
				<div className='mt-3 max-lg:mt-6 flex w-full justify-between max-lg:flex-col-reverse max-lg:gap-3 items-center'>
					<FilterVideos videosLength={user?.videos.length} />
					<SearchComponent placeholder='Поиск по видео' />
				</div>
				<UserVideos
					query={searchParams?.q}
					videos={user?.videos}
				/>
			</div>
		</>
	);
};
export default ProfilePage;
