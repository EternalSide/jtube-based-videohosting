"use client";
import {useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Search} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery} from "@/lib/utils";

interface Props {
	placeholder: string;
}

const SearchComponent = ({placeholder}: Props) => {
	const [value, setValue] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!value) return router.push(window.location.pathname);

		const debounce = setTimeout(() => {
			if (value) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "q",
					value,
				});
				router.push(newUrl, {scroll: false});
			}
		}, 300);

		return () => clearTimeout(debounce);
	}, [value]);

	return (
		<div className='max-[1200px]:w-full mb-6 rounded-none flex min-h-[40px] items-center gap-1 border-b border-border shadow-md focus-within:border-indigo-500 lg:w-[300px]'>
			<Input
				onChange={(e) => setValue(e.target.value)}
				type='text'
				placeholder={placeholder}
				className='no-focus bg-transparent border-none outline-none shadow-none placeholder:text-sm'
			/>

			<Search className='icon_6 mr-4' />
		</div>
	);
};
export default SearchComponent;
