import Link from "next/link";
import NextImage from "@/components/shared/NextImage";

const UserNotFound = () => {
	return (
		<div className='w-full min-h-screen mt-[200px] flex items-center flex-col gap-6'>
			<NextImage
				src='/404error.webp'
				alt='Ошибка 404: Пользователь не найден'
				width='w-[400px] max-sm:w-[300px]'
				height='h-64'
				className='rounded-md'
			/>

			<div>
				<h1 className='text-2xl font-semibold'>Пользователь не найден...</h1>
				<Link href='/'>
					<p className='text-indigo-500 text-center font-semibold'>
						Вернуться на главную
					</p>
				</Link>
			</div>
		</div>
	);
};
export default UserNotFound;
