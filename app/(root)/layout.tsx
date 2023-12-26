import Navbar from "@/components/shared/Navbar/Navbar";
import VideoBottom from "@/components/shared/Video/VideoBottom";
import {Toaster} from "@/components/ui/toaster";
import {ChildrenProps} from "@/constants/types/index.shared";
import {getUserNotifications, updateUser} from "@/lib/actions/user.action";
import ModalProvider from "@/providers/ModalProvider";
import {auth} from "@clerk/nextjs";

const MainLayout = async ({children}: ChildrenProps) => {
	const {userId} = auth();

	let notifications;

	if (userId) {
		notifications = await getUserNotifications({clerkId: userId});
	} else {
		notifications = null;
	}

	return (
		<>
			<Navbar notifications={notifications} />
			{children}
			<Toaster />
			<VideoBottom />
			<ModalProvider />
		</>
	);
};
export default MainLayout;
