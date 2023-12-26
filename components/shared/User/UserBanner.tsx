"use client";
import {useEffect, useState} from "react";
import {useEdgeStore} from "@/lib/edgestore";
import {handleUserBg} from "@/lib/actions/user.action";
import {usePathname} from "next/navigation";
import {NextImage} from "shinigami";
import UploadImageModal from "@/components/modals/UploadImageModal";

interface Props {
	background: string | null | undefined;
	userId: string;
	isOwnProfile: boolean;
}

const UserBanner = ({background, userId, isOwnProfile}: Props) => {
	const [isHover, setIsHover] = useState(false);
	const [file, setFile] = useState<any>();
	const {edgestore} = useEdgeStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setFile(background);
	}, [isModalOpen]);

	const uploadImage = async () => {
		setIsModalOpen(false);
		try {
			if (file) {
				const res = await edgestore.usersBg.upload({
					file,
				});

				await handleUserBg({
					userId,
					background: res.url,
					pathname,
				});
				if (background) {
					await edgestore.usersBg.delete({
						url: background,
					});
				}
			}
			if (!file && background) {
				await handleUserBg({
					userId,
					background: "",
					pathname,
				});
				await edgestore.usersBg.delete({
					url: background,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className='relative w-full h-[270px] '
		>
			{!background ? (
				<div className='bg-indigo-700 h-full w-full' />
			) : (
				<NextImage
					src={background}
					alt='Баннер пользователя'
					width='w-full'
					height='h-[270px]'
					className='object-center object-cover'
					containerClassNames={`transition-all duration-100 ${
						isHover && isOwnProfile && "opacity-50"
					}`}
				/>
			)}
			{isOwnProfile && (
				<UploadImageModal
					file={file}
					setFile={setFile}
					buttonDisabled={file === background}
					onClick={uploadImage}
					contentStyles='sm:max-w-[80%] border-border'
					title='Загрузите изображение'
				>
					<div className='absolute w-full h-full top-0'>
						<div className='max-w-[1350px] mx-auto w-full relative'>
							<button
								onClick={() => setIsModalOpen(true)}
								className={`opacity-0 invisible transition-all duration-300 bg-white mr-10 rounded-3xl hover:opacity-90  text-black py-2.5 px-8 absolute right-0 top-4 ${
									isHover && "!opacity-100 !visible"
								}`}
							>
								{background ? "Изменить" : "Добавить"}
							</button>
						</div>
					</div>
				</UploadImageModal>
			)}
		</div>
	);
};
export default UserBanner;
