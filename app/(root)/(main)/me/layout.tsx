import MePageFilters from "@/components/shared/Me/MePageFilters";
import MePageMobileFilters from "@/components/shared/Me/MePageMobileFilters";
import {ChildrenProps} from "@/constants/types/index.shared";

const MeLayoutPage = ({children}: ChildrenProps) => {
	return (
		<div className='w-full px-10 py-[25px]'>
			<div className='mb-10'>
				<h1 className='text-3xl font-semibold'>Моё</h1>
				<MePageFilters />
				<MePageMobileFilters />
			</div>
			{children}
		</div>
	);
};
export default MeLayoutPage;
