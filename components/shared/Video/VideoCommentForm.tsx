"use client";
import {Input} from "@/components/ui/input";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {leaveComment} from "@/lib/actions/video.action";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {addReplyToComment} from "@/lib/actions/comment.action";
import {commentSchema} from "@/lib/validation";
import {NextImage} from "shinigami";

interface Props {
	userPicture?: string;
	userId?: string;
	authorId?: string;
	userName?: string;
	commentsLength?: number;
	videoId?: string;
	type?: string;
	setIsOpenReply?: any;
	commentId?: string;
	setMoreComments?: any;
	currentUserPic?: any;
}

const VideoCommentForm = ({
	userPicture,
	userId,
	authorId,
	userName,
	commentsLength,
	videoId,
	setIsOpenReply,
	commentId,
	setMoreComments,
	currentUserPic,
	type,
}: Props) => {
	const [active, setActive] = useState(false);
	const inputRef = useRef<HTMLDivElement>(null);
	const path = usePathname();
	const {toast} = useToast();

	const isComment = type === "comment";

	const form = useForm<z.infer<typeof commentSchema>>({
		defaultValues: {
			"comment_text": "",
		},
		resolver: zodResolver(commentSchema),
	});

	useEffect(() => {
		const handleOutsideClick = (e: any) => {
			if (inputRef.current && !inputRef.current.contains(e.target)) {
				if (isComment) {
					return setIsOpenReply(false);
				} else {
					return setActive(false);
				}
			}
		};

		document.addEventListener("click", handleOutsideClick);

		return () => document.removeEventListener("click", handleOutsideClick);
	}, [inputRef]);

	const onSubmit = async (values: z.infer<typeof commentSchema>) => {
		try {
			if (!userId) {
				return toast({
					title: "Войдите, чтобы оставить комментарий",
					variant: "destructive",
				});
			}

			if (!isComment) {
				await leaveComment({
					userId,
					authorId: authorId!,
					path,
					videoId: videoId!,
					text: values.comment_text,
				});
			} else {
				const data = await addReplyToComment({
					commentId,
					commentText: values.comment_text,
					userId,
					path,
				});

				setMoreComments((prev: any) => [...prev, data]);
			}
		} catch (e) {
			console.log(e);
		} finally {
			resetForm();
		}
	};

	const resetForm = () => {
		setActive(false);
		form.resetField("comment_text");
	};
	const {isLoading, isValid} = form.formState;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`max-lg:px-6 min-h-[155px] ${!isComment && "mb-6 "} ${
					isComment && "ml-16"
				}`}
			>
				<div ref={inputRef}>
					{!isComment && (
						<h3 className='font-semibold text-xl mt-6'>
							Комментариев ({commentsLength})
						</h3>
					)}
					<div className='mt-6 flex gap-3 items-center'>
						<Link href={userId ? `/${userName}` : "/sign-in"}>
							<NextImage
								alt={userName || ""}
								src={
									!isComment
										? userPicture || "/nouser.png"
										: currentUserPic || "/nouser.png"
								}
								width='w-12'
								height='h-12'
								className='rounded-full object-cover'
							/>
						</Link>
						<FormField
							control={form.control}
							name='comment_text'
							render={({field}) => (
								<FormItem className='w-full'>
									<FormControl>
										<Input
											onFocus={() => setActive(true)}
											type='text'
											className='border-b focus:border-indigo-600 pt-4 pb-8'
											placeholder='Оставьте комментарий'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					{active && (
						<div className='flex justify-end gap-5 w-full mt-2'>
							<Button
								disabled={isLoading}
								onClick={resetForm}
								className='bg-transparent text-white hover:bg-neutral-800 rounded-2xl'
							>
								Отмена
							</Button>
							<Button
								type='submit'
								disabled={isLoading || !isValid}
								className='bg-indigo-600 text-white  rounded-2xl hover:bg-indigo-500 disabled:bg-indigo-500/50'
							>
								Отправить
							</Button>
						</div>
					)}
				</div>
			</form>
		</Form>
	);
};
export default VideoCommentForm;
