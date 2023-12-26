import PlayListSettingsAction from "@/components/actions/PlayListSettingsAction";
import NotFound from "@/components/shared/NotFound";
import {getUserPlaylists} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";
import Link from "next/link";
import {redirect} from "next/navigation";
import {NextImage} from "shinigami";

const PlayListsPage = async () => {
	const {userId} = auth();
	if (!userId) return redirect("/sign-in");
	const playlists = await getUserPlaylists({clerkId: userId});

	return (
		<div className='w-full px-10 pt-[25px]'>
			<h1 className='text-3xl font-semibold'>Мои плейлисты</h1>
			<p className='text-base text-zinc-400 mt-2'>
				Плейлисты, которые вы создали.
			</p>
			<div className='grid 2xl:grid-cols-5 lg:grid-cols-2 md:grid-cols-2 mt-6 gap-x-6 gap-y-14'>
				{playlists?.length > 0 ? (
					playlists.map((item: any) => (
						<Link
							href={`playlist/${item._id.toString()}`}
							className='bg-black border border-border rounded-md flex flex-col p-6 gap-5'
							key={item._id}
						>
							<NextImage
								alt={item.name}
								src={
									item.picture ||
									"https://t4.ftcdn.net/jpg/02/35/35/39/360_F_235353943_PtGi4eSoAWrwt8u7dMhDJetZlu9oIMIY.jpg"
								}
								width='w-full'
								height='h-64'
								className='rounded-md object-cover'
							/>
							<div className='flex justify-between items-center'>
								<h3 className='font-semibold text-xl'>{item.name}</h3>
								<PlayListSettingsAction
									userId={userId}
									playlistId={item._id.toString()}
								/>
							</div>
						</Link>
					))
				) : (
					<NotFound />
				)}
			</div>
		</div>
	);
};
export default PlayListsPage;
