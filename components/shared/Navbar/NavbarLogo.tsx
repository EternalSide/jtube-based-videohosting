import Image from "next/image";
import Link from "next/link";

const NavbarLogo = () => {
	return (
		<Link
			href='/'
			className='flex items-center gap-2'
		>
			<Image
				width={48}
				height={48}
				alt='Лого'
				src='/logo.png'
				className='max-sm:hidden object-cover rounded-full bg-transparent shadow-2xl shadow-white hover:scale-105 hover:shadow-indigo-500 transition duration-300'
			/>
			<div className='relative max-sm:hidden max-[1100px]:hidden'>
				<h1 className='font-bold text-3xl max-sm:hidden'>JTUBE</h1>
				<Image
					src='/flag.webp'
					alt='Флаг России'
					width={16}
					height={16}
					className='absolute -right-4 -top-0.5 -skew-y-6'
				/>
			</div>
		</Link>
	);
};
export default NavbarLogo;
