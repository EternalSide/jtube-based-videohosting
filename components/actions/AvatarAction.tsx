"use client";
import {Camera} from "lucide-react";
import {useEffect, useState} from "react";
import {useEdgeStore} from "@/lib/edgestore";
import {uploadUserAvatar} from "@/lib/actions/user.action";
import {usePathname} from "next/navigation";
import {NextImage} from "shinigami";
import UploadImageModal from "../modals/UploadImageModal";

interface Props {
	username: string;
	picture: string;
	isOwnProfile: boolean | string | null;
	userId: any;
}

const AvatarAction = ({username, picture, isOwnProfile, userId}: Props) => {
	const [isHover, setIsHover] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [file, setFile] = useState<any>();
	const {edgestore} = useEdgeStore();
	const pathname = usePathname();

	useEffect(() => {
		if (picture === file) return;

		setFile(picture);
	}, [isModalOpen]);

	const uploadImage = async () => {
		setIsModalOpen(false);
		try {
			if (file) {
				const res = await edgestore.usersImages.upload({
					file,
				});
				await uploadUserAvatar({
					userId,
					avatar: res.url,
					pathname,
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className='block relative h-[128px] w-[128px]'
		>
			{isOwnProfile && (
				<UploadImageModal
					file={file}
					setFile={setFile}
					buttonDisabled={!file || file === picture}
					onClick={uploadImage}
				>
					<button
						onClick={() => setIsHover(false)}
						className={`invisible opacity-0 transition-all duration-150 h-full w-full absolute flex justify-center items-center left-2/4 top-2/4 z-[10] -translate-x-2/4 -translate-y-2/4 bg-black/50 ${
							isHover && "!opacity-100 !visible"
						}`}
					>
						<Camera className='h-9 w-9 text-neutral-300' />
					</button>
				</UploadImageModal>
			)}
			<NextImage
				src={picture}
				alt={username}
				width='w-[128px]'
				height='h-[128px]'
				className='rounded-full object-cover'
			/>
		</div>
	);
};
export default AvatarAction;
