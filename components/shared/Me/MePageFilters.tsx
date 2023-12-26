import {mePageFilterOptions} from "@/constants";
import {MeFilterOption} from "@/constants/types/index.shared";
import Link from "next/link";

const MePageFilters = () => {
	return (
		<div className='flex items-center gap-3 mt-4 max-md:hidden'>
			{mePageFilterOptions.map((item: MeFilterOption) => (
				<Link
					key={item.value}
					href={`${item.href}`}
					className='button-main'
				>
					<item.icon className='icon_5' />
					{item.label}
				</Link>
			))}
		</div>
	);
};
export default MePageFilters;
