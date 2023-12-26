import {IUser} from "@/database/models/user.model";
import HeaderActions from "@/components/actions/HeaderActions";
import AvatarAction from "@/components/actions/AvatarAction";
import {Check} from "lucide-react";
import ActionTooltip from "../ActionTooltip";
interface UserHeaderProps {
	isOwnProfile: boolean | string | null;
	isFollowing: boolean;
	user: IUser;
	currentUserId: string;
}

const UserHeader = ({
	isOwnProfile,
	user,
	isFollowing,
	currentUserId,
}: UserHeaderProps) => {
	return (
		<div className='mt-10 flex justify-between items-start max-md:flex-col max-md:gap-6'>
			<div className='flex items-start gap-5 max-sm:flex-col'>
				<AvatarAction
					picture={user.picture}
					username={user.username}
					isOwnProfile={isOwnProfile}
					userId={user._id.toString()}
				/>

				<div className='flex flex-col gap-0 mt-0.5'>
					<div className='flex items-center gap-1.5'>
						<h3 className='font-medium text-2xl'>{user.name}</h3>
						{user.role === "admin" && (
							<ActionTooltip
								side='bottom'
								label='Пользователь является администратором'
							>
								<Check className='cursor-pointer icon_6 text-indigo-500' />
							</ActionTooltip>
						)}
					</div>
					<div className='flex items-center gap-2 mt-0.5'>
						<p className='text-sm text-zinc-400'>@{user.username}</p>
						<p className='text-sm text-zinc-400'>
							{user.followers?.length || 0} подписчиков
						</p>
						<p className='text-sm text-zinc-400'>{user.videos.length} видео</p>
					</div>
					<p className='text-sm text-zinc-400 mt-3'>
						{user?.about || "Информация отсутствует."}
					</p>
					{user?.link ? (
						<a
							href={user.link}
							target='_blank'
						>
							<p className='text-sm text-indigo-500 mt-3'>{user.link}</p>
						</a>
					) : (
						<p className='text-sm text-indigo-500 mt-3'>
							Контактные данные не установлены.
						</p>
					)}
				</div>
			</div>
			<HeaderActions
				isFollowing={isFollowing}
				currentUserId={currentUserId}
				userId={user._id.toString()}
				isOwnProfile={isOwnProfile}
				name={user?.name}
				about={user?.about}
				link={user?.link}
				clerkId={user?.clerkId}
			/>
		</div>
	);
};
export default UserHeader;
