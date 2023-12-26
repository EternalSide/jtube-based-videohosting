import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import SheetSidebar from "@/components/shared/Sidebar/SheetSidebar";
import {ChildrenProps} from "@/constants/types/index.shared";
import {getUserById} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";

const RootLayout = async ({children}: ChildrenProps) => {
	const {userId} = auth();
	const currentUser = await getUserById(userId!);

	const followings = currentUser ? currentUser?.followingIds : null;

	return (
		<>
			<div className='flex'>
				<SheetSidebar
					username={currentUser?.username}
					followingIds={
						currentUser
							? JSON.parse(JSON.stringify(currentUser?.followingIds))
							: null
					}
				/>
				<LeftSidebar
					username={currentUser?.username}
					followings={followings}
				/>
				<div className='pl-[280px] py-[72px] w-full max-lg:pl-[100px] max-sm:pl-0'>
					{children}
				</div>
			</div>
		</>
	);
};
export default RootLayout;
