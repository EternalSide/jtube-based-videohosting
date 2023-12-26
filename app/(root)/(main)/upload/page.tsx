import UploadVideoForm from "@/components/forms/UploadVideo/UploadVideoForm";
import {auth} from "@clerk/nextjs";
import {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
	title: {
		absolute: "Загрузить новое видео / JTUBE",
	},
};

const UploadPage = () => {
	const {userId} = auth();
	if (!userId) return redirect("/sign-in");

	return (
		<div className='px-10 pt-[25px] w-full'>
			<h1 className='font-bold text-3xl'>Загрузить видео</h1>
			<UploadVideoForm userId={userId} />
		</div>
	);
};
export default UploadPage;
