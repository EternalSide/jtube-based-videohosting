"use client";
import {useModal} from "@/hooks/useModal";
import {usePathname} from "next/navigation";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "../ui/button";
import {ArrowLeft, Loader2Icon, Plus} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {getUserPlaylists} from "@/lib/actions/user.action";
import {Input} from "../ui/input";
import {toast} from "../ui/use-toast";
import {IPlaylist} from "@/database/models/playlist.model";
import {addVideoInPlaylistDb} from "@/lib/actions/video.action";
import PlaylistCheck from "../shared/Video/PlaylistCheck";
import {addNewPlaylistToDB} from "@/lib/actions/playlist.action";
import Link from "next/link";

const AddInPlaylistModal = () => {
	const {isOpen, setIsOpen, type, data} = useModal();
	const open = type === "addInPlaylist" && isOpen;
	const path = usePathname();
	const [playlists, setPlaylists] = useState([]);
	const [isCreatingNewPlaylist, setIsCreatingNewPlaylist] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!data.currentUserId) return;
		if (isOpen) {
			setIsLoading(true);

			setIsCreatingNewPlaylist(false);
			const getPlaylists = async () => {
				const serverData = await getUserPlaylists({
					userId: data.currentUserId,
				});
				setPlaylists(serverData);
				setIsLoading(false);
			};

			getPlaylists();
		}
	}, [isOpen]);

	const addNewPlaylist = async () => {
		try {
			if (!data.currentUserId) {
				return toast({
					title: "Вы не авторизованы",
				});
			}

			//@ts-ignore
			const name = inputRef?.current.value;
			if (name.length < 3 || name.length > 50) {
				return toast({
					title: "Имя плейлиста не может быть меньше 3 и больше 50 символов.",
					variant: "destructive",
				});
			}
			const playlist = await addNewPlaylistToDB({
				userId: data.currentUserId,
				path,
				name,
				picture: data.videoPicture,
			});

			setPlaylists([
				// @ts-ignore
				{
					...playlist,
					_id: playlist._id.toString(),
				},
				...playlists,
			]);
			setIsCreatingNewPlaylist(false);
			// @ts-ignore
			inputRef.current.value = "";
			return toast({
				title: "Плейлист добавлен  ✅",
			});
		} catch (e) {
			console.log(e);
		}
	};

	const addVideoToPlaylist = async (
		playListId: string,
		playListName: string,
		isInPlaylist: boolean
	) => {
		await addVideoInPlaylistDb({
			path,
			playListId,
			videoId: data.videoId,
			isInPlaylist,
		});

		return toast({
			title: !isInPlaylist
				? `Видео добавлено в плейлист ${playListName}  ✅`
				: `Видео удалено из плейлиста ${playListName}  ✅`,
		});
	};

	if (!data.currentUserId) {
		return (
			<Dialog
				open={open}
				onOpenChange={() => setIsOpen(!isOpen, "addInPlaylist")}
			>
				<DialogContent className='!z-[100000]'>
					<DialogHeader>
						<DialogTitle className='mb-1.5'>Выберите плейлист</DialogTitle>
						<DialogDescription className='flex flex-col gap-6 !my-4 text-center'>
							Вы не авторизованы. <br />
							Добавление видео в плейлист доступно только для зарегистрированных
							пользователей.
						</DialogDescription>
					</DialogHeader>

					<Link href={"/sign-in"}>
						<Button className='w-full bg-indigo-600 gap-3'>
							Страница Авторизации
						</Button>
					</Link>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={() => setIsOpen(!isOpen, "addInPlaylist")}
		>
			<DialogContent className='!z-[100000]'>
				<DialogHeader>
					<DialogTitle className='mb-1.5'>Выберите плейлист</DialogTitle>
					<DialogDescription className='flex flex-col gap-6 !my-4'>
						{isLoading === true && (
							<Loader2Icon className='relative mx-auto h-10 w-10 animate-spin text-indigo-500' />
						)}
						{!isLoading && playlists && playlists?.length > 0
							? playlists.map((item: IPlaylist) => (
									<PlaylistCheck
										key={item._id}
										addVideoToPlaylist={addVideoToPlaylist}
										item={item}
										videoId={data.videoId}
									/>
							  ))
							: !isLoading && (
									<div className='text-center'>Ничего не найдено.</div>
							  )}
					</DialogDescription>
				</DialogHeader>
				{isCreatingNewPlaylist ? (
					<div className='w-full'>
						<p className='mb-1.5 font-medium'>Название</p>
						<Input
							type='text'
							ref={inputRef}
							className='bg-transparent !border-b border-border '
						/>
						{/* <div className='mt-6'>
							<p className='mb-1.5 font-medium'>Доступ</p>
							<Select
								onValueChange={() => {}}
								defaultValue='private'
							>
								<SelectTrigger>
									<SelectValue placeholder='Для вас' />
								</SelectTrigger>

								<SelectContent className='py-0 border-border '>
									<SelectItem value='private'>Для всех</SelectItem>
								</SelectContent>
							</Select>
						</div> */}
						<div className='justify-between w-full flex items-center mt-6'>
							<button onClick={() => setIsCreatingNewPlaylist(false)}>
								<ArrowLeft />
							</button>
							<Button
								onClick={addNewPlaylist}
								className='bg-indigo-600 '
							>
								Создать
							</Button>
						</div>
					</div>
				) : (
					<Button
						onClick={() => setIsCreatingNewPlaylist(true)}
						className='w-full bg-indigo-600 gap-3'
					>
						<Plus />
						Новый плейлист
					</Button>
				)}
			</DialogContent>
		</Dialog>
	);
};
export default AddInPlaylistModal;
