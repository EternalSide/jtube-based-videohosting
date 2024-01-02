import UploadVideoForm from "@/components/forms/UploadVideo/UploadVideoForm";
import {getUserById} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";
import {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
	title: {
		absolute: "Загрузить новое видео / JTUBE",
	},
};

const UploadPage = async () => {
	const {userId} = auth();
	if (!userId) return redirect("/sign-in");

	const user = await getUserById(userId);

	if (!user || user?.role !== "admin") {
		return (
			<div className='px-10 pt-[25px] w-full'>
				<h1 className='font-bold text-xl text-red-500'>
					Ошибка:{" "}
					<span className='text-white'>
						В данный момент загружать видео могут только Администраторы.
					</span>
				</h1>
			</div>
		);
	}

	return (
		<div className='px-10 pt-[25px] w-full'>
			<h1 className='font-bold text-3xl'>Загрузить видео</h1>
			<UploadVideoForm userId={userId} />
		</div>
	);
};
export default UploadPage;
