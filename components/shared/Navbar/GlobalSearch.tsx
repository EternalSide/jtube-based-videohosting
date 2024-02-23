"use client";
import {Input} from "@/components/ui/input";
import {Frown, Search, X} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {globalSearch} from "@/lib/actions/general.action";
import SearchCard from "./Search/SearchCard";
import useOutSideClick from "@/hooks/useOutSideClick";

const GlobalSearch = () => {
	const [searchValue, setSearchValue] = useState("");
	const [result, setResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [isFocused, setIsFocused] = useState(false);

	useOutSideClick({
		containerRef,
		dependencies: [containerRef, pathname],
		setIsOpen,
		functionAfterCondition: () => {
			setIsOpen(false);
		},
		functionInCondition() {
			setIsFocused(false);
		},
	});

	useEffect(() => {
		setResult([]);
		setIsLoading(true);

		const fetchSearchResults = async () => {
			const results: any = await globalSearch(searchValue.trim());
			if (!isOpen) setIsOpen(true);
			setResult(results);
			setIsLoading(false);
			return results;
		};

		const debounced = setTimeout(() => {
			if (searchValue) {
				fetchSearchResults();
			}
		}, 300);

		return () => clearTimeout(debounced);
	}, [searchValue, setSearchValue]);

	const onChange = (e: any) => {
		setSearchValue(e.target.value);
		// if (!isOpen) setIsOpen(true);
		if (e.target.value === "" || (e.target.value.length === 0 && isOpen)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		const handleEnter = (e: any) => {
			console.log(isFocused);
			if (e.key === "Enter" && isFocused) {
				if (!searchValue) return;
				router.push(`/search?q=${searchValue}`);
			}
		};

		document.addEventListener("keydown", handleEnter);

		return () => document.removeEventListener("keydown", handleEnter);
	}, [searchValue, isFocused]);

	return (
		<div
			ref={containerRef}
			className='fixed left-2/4 -translate-x-2/4 w-[525px] max-lg:hidden'
		>
			<div className='rounded-2xl z-50 flex min-h-[40px] items-center gap-1 border border-border shadow-md focus-within:border-indigo-600'>
				<Input
					className='no-focus bg-transparent border-none outline-none shadow-none placeholder:text-base pl-4'
					type='text'
					placeholder='Введите запрос'
					onFocus={() => {
						setIsFocused(true);
						result.length > 0 && setIsOpen(true);
					}}
					value={searchValue}
					onChange={onChange}
				/>
				{searchValue?.length >= 1 && (
					<button
						onClick={() => {
							setSearchValue("");
							setIsOpen(false);
						}}
					>
						<X className='h-[27px] w-[27px] mr-2 text-neutral-300' />
					</button>
				)}
				<button
					onClick={() => {
						if (!searchValue) return;
						router.push(`/search?q=${searchValue}`);
						setIsOpen(false);
						setIsFocused(false);
					}}
				>
					<Search className='icon_6 mr-4 text-neutral-300' />
				</button>
			</div>
			{isOpen && (
				<div className='absolute top-full z-[1000] py-3 pb-0 mt-2.5 w-full bg-black shadow-sm shadow-black rounded-md'>
					<div className='space-y-5 min-h-[400px]'>
						{isLoading ? (
							<div className='flex flex-col'>
								<h3 className='px-5 font-semibold text-zinc-200 text-lg pb-4'>
									Результаты
								</h3>
								<div className='border-b border-border ' />
								<div className='flex justify-center items-center h-[400px] gap-2'>
									{/* <Loader2Icon className='relative mx-auto h-12 w-12 animate-spin text-indigo-500' /> */}
								</div>
							</div>
						) : (
							<div className='flex flex-col'>
								<h3 className='px-5 font-semibold text-zinc-200 text-lg pb-4'>
									Результаты
								</h3>
								<div className='border-b border-border ' />
								{result?.length > 0 ? (
									<div className='py-3 flex flex-col gap-2'>
										{result.map((item: any, index: number) => (
											<SearchCard
												key={item._id}
												item={item}
												index={index}
											/>
										))}
									</div>
								) : (
									<div className='flex flex-col items-center text-center px-4 py-10 mt-20'>
										<Frown className='h-16 w-16 text-zinc-400' />
										<p className='text-zinc-200 mt-3.5 '>
											Ничего не найдено...
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default GlobalSearch;
