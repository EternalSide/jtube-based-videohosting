"use client";
import {videosFilterOptions} from "@/constants";
import {FilterOption} from "@/constants/types/index.shared";
import {cn} from "@/lib/utils";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

interface Props {
	videosLength: number;
}

const FilterVideos = ({videosLength}: Props) => {
	const searchParams = useSearchParams();
	const value = searchParams.get("sort");

	const [active, setActive] = useState(value || "new");
	const router = useRouter();

	const handleFiltering = (value: string) => {
		if (videosLength === 0) return setActive(value);

		setActive(value);

		const url = window.location.pathname + `?sort=${value}`;

		router.push(url, {scroll: false});
	};

	useEffect(() => {
		if (!searchParams.get("sort")) return setActive("new");
	}, [searchParams]);

	return (
		<div className=' items-center gap-3 justify-start flex !overflow-hidden'>
			{videosFilterOptions.map((item: FilterOption) => (
				<button
					key={item.value}
					onClick={() => handleFiltering(item.value)}
					className={cn(
						"button-main !rounded-[6px] font-semibold",
						active === item.value ? "!bg-indigo-600" : "non-active"
					)}
				>
					{item.label}
				</button>
			))}
		</div>
	);
};
export default FilterVideos;
