"use client";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {useEffect, useState} from "react";
import {useEdgeStore} from "@/lib/edgestore";
import {toast} from "../../ui/use-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {usePathname, useRouter} from "next/navigation";
import {uploadVideo} from "@/lib/actions/video.action";
import {UploadVideo} from "@/components/shared/UploadVideo";
import {videoUploadSchema} from "@/lib/validation";
import {ImageIcon, Trash2, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import ProgressPoint from "./ProgressPoint";
import {videoCategories} from "@/constants";

const UploadVideoForm = ({userId}: {userId: string}) => {
	const {edgestore} = useEdgeStore();
	const router = useRouter();
	const path = usePathname();
	const form = useForm<z.infer<typeof videoUploadSchema>>({
		resolver: zodResolver(videoUploadSchema),
		defaultValues: {
			video_title: "",
			video_description: "",
			video_category: "",
			tags: [],
		},
		mode: "onSubmit",
	});

	// Видео и превью.
	const [file, setFile] = useState<File>();
	const [videoPreviewFile, setVideoPreviewFile] = useState<File>();

	// Loading Progress
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [loadingStarted, setLoadingStarted] = useState(false);
	const loadingFinished = loadingProgress === 100;

	// Ссылки от EdgeStore для записи в бд.
	const [videoUrl, setVideoUrl] = useState("");

	const onSubmit = async (values: z.infer<typeof videoUploadSchema>) => {
		if (!loadingFinished || !file)
			return toast({
				title: "Видео еще не загружено 😔",
				description: "Дождитесь окончания загрузки видеофайла",
				className: "!border-border",
			});

		if (!videoPreviewFile)
			return toast({
				title: "Добавьте превью ❌",
			});

		toast({
			title:
				"Сохраняем ваше видео, через несколько секунд вы будете перенаправлены на его страницу 😎",
		});

		const res = await edgestore.videosPreviews.upload({
			file: videoPreviewFile,
		});

		const videoId = await uploadVideo({
			values: {
				...values,
				videoPreviewUrl: res.url,
				videoUrl,
				author: userId,
				tags: values?.tags ? values.tags : [],
			},
			path,
		});

		return router.push(`/video/${videoId}`);
	};

	const cancelUpload = () => {
		setFile(undefined);
		setVideoPreviewFile(undefined);
		setLoadingProgress(0);
		setLoadingStarted(false);
		form.reset();
		form.clearErrors();
	};

	const handleVideoUpload = async (e: any) => {
		e.preventDefault();
		if (file) {
			setLoadingStarted(true);

			const res = await edgestore.videos.upload({
				file,
				onProgressChange: (progress: any) => {
					setLoadingProgress(progress);
				},
			});

			setVideoUrl(res.url);
		}
	};

	useEffect(() => {
		if (file) {
			form.setValue("video_title", file.name);
		}
	}, [file]);

	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: any
	) => {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();
			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim().toLowerCase();

			if (tagValue !== "") {
				if (tagValue.length > 30 || tagValue.length < 3) {
					return form.setError("tags", {
						type: "required",
						message: "Тег не может быть меньше 3 и больше 30 символов.",
					});
				}
				if (field.value.length >= 5) {
					return form.setError("tags", {
						type: "required",
						message: "Тегов не может быть больше 5.",
					});
				}

				// * Если Тега нету, то добавим его.
				if (!field.value.includes(tagValue as never)) {
					form.setValue("tags", [...field.value, tagValue]);
					tagInput.value = "";
					form.clearErrors("tags");
				}
			} else {
				form.trigger();
			}
		}
	};

	const handleTagRemove = (tag: string, field: any) => {
		const newTags = field.value.filter((t: string) => t !== tag);
		form.setValue("tags", newTags);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 '
			>
				{loadingStarted && (
					<div className='relative rounded-[10px] bg-[#141414] w-full px-6 py-12 mt-6'>
						<div className='flex gap-4 items-start'>
							<div className='w-full relative'>
								<div
									style={{
										width: `${loadingProgress}%`,
									}}
									className='bg-indigo-600 h-1 relative z-[5] rounded-md'
								/>
								<div className='bg-neutral-600 w-full h-[2px] top-[1px] absolute left-0' />
								<div className='flex justify-between items-center'>
									<ProgressPoint text='Загрузка началась' />
									<ProgressPoint text='Обработка' />
									<ProgressPoint text='Сохранение' />
								</div>
							</div>

							<button
								className='-mt-2.5'
								onClick={cancelUpload}
								type='button'
							>
								<Trash2 className='text-zinc-400 hover:text-white transition' />
							</button>
						</div>

						<div className='flex gap-6 w-full max-2xl:flex-col max-2xl:items-center mt-8'>
							<div className='flex flex-col gap-7 flex-1 max-2xl:max-w-[500px] max-2xl:w-full'>
								<FormField
									control={form.control}
									name='video_title'
									render={({field}) => (
										<FormItem>
											<FormLabel>
												Название <span className='text-indigo-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Введите название видео'
													className='no-focus focus:border-indigo-500 pb-16 pt-4'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='video_description'
									render={({field}) => (
										<FormItem>
											<FormLabel>Описание</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Введите описание'
													className='no-focus focus:border-indigo-500 pb-20'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='tags'
									render={({field}) => (
										<FormItem className='flex w-full flex-col'>
											<FormLabel className='paragraph-semibold text-dark400_light800'>
												Теги <span className='text-primary-500'>*</span>
											</FormLabel>
											<FormControl className='mt-3.5'>
												<>
													<Input
														placeholder='React'
														className='no-focus focus:border-indigo-500 min-h-[56px] border'
														onKeyDown={(e) => handleInputKeyDown(e, field)}
													/>
													{field?.value && field.value.length > 0 && (
														<div className='flex items-start flex-wrap mt-2.5 gap-2.5'>
															{field?.value &&
																field.value.map((tag: any) => (
																	<button
																		onClick={() => handleTagRemove(tag, field)}
																		className='flex items-center justify-center gap-2 rounded-md border-none px-3 py-1.5 bg-indigo-600 capitalize'
																		key={tag}
																	>
																		{tag}
																		<X className='h-3 w-3 cursor-pointer text-black' />
																	</button>
																))}
														</div>
													)}
												</>
											</FormControl>
											<FormDescription className='!text-neutral-300 mt-2.5 text-light-500'>
												Нажатие на Enter добавит подходящий тег. Не больше 30
												тегов.
											</FormDescription>
											<FormMessage className='text-red-500' />
										</FormItem>
									)}
								/>
							</div>
							<div className='max-w-[650px] w-full max-[1613px]:max-w-[500px] flex flex-col gap-7'>
								<FormField
									control={form.control}
									name='video_category'
									render={({field}) => (
										<FormItem>
											<FormLabel>
												Категория <span className='text-indigo-500'>*</span>
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Выберите категорию' />
													</SelectTrigger>
												</FormControl>
												<SelectContent className='py-0 border-border '>
													{videoCategories.map((category: any) => (
														<SelectItem value={category.label}>
															{category.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<div>
									<FormLabel>
										Превью <span className='text-indigo-500'>*</span>
									</FormLabel>
									<UploadVideo
										className='mt-2 bg-black'
										height={425}
										value={videoPreviewFile}
										onChange={(data) => setVideoPreviewFile(data)}
										acceptProps={{"image/*": []}}
										type='image'
									/>

									<div className='flex gap-2 items-center mt-3'>
										<ImageIcon className='text-zinc-400' />
										<div>
											<p className='text-sm'>Изображение</p>
											<p className='text-xs text-zinc-400 mt-0.5'>
												jpeg, jpg или png, не более 10 МБ
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Закончить загрузку */}
				{loadingStarted && (
					<div className='rounded-[10px] bg-[#141414] w-full flex-center p-6'>
						<button
							type='submit'
							className='bg-indigo-600 rounded-md py-3 px-2.5 w-full'
						>
							Сохранить и выйти
						</button>
					</div>
				)}

				{/* Начать загрузку */}
				{!loadingStarted && (
					<div className='w-full rounded-lg h-[500px] mt-8'>
						<UploadVideo
							height={200}
							value={file}
							onChange={(data) => setFile(data)}
							acceptProps={{"video/*": []}}
						/>
						<button
							className='bg-indigo-600 w-full py-2.5 rounded-md disabled:cursor-not-allowed'
							disabled={!file}
							type='button'
							onClick={handleVideoUpload}
						>
							Начать загрузку
						</button>
					</div>
				)}
			</form>
		</Form>
	);
};

export default UploadVideoForm;
