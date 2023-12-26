"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import {SingleImageDropzone} from "../shared/SingleImageDropzone";
import {Button} from "../ui/button";

const UploadImageModal = ({
	file,
	setFile,
	buttonDisabled,
	onClick,
	children,
	contentStyles,
	title,
}: any) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={setIsModalOpen}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				className={
					contentStyles ? contentStyles : "sm:max-w-[425px] border-border"
				}
			>
				<DialogHeader>
					<DialogTitle className='mb-3'>
						{title ? title : "Загрузите аватар"}
					</DialogTitle>
				</DialogHeader>

				<SingleImageDropzone
					className='w-full'
					height={400}
					value={file}
					onChange={(file) => setFile(file)}
				/>
				<Button
					disabled={buttonDisabled}
					onClick={onClick}
					className='bg-indigo-600 text-white disabled:opacity-80'
					type='submit'
				>
					Cохранить
				</Button>
			</DialogContent>
		</Dialog>
	);
};
export default UploadImageModal;
