"use client";
import {CheckCheck, Copy} from "lucide-react";
import {Button} from "../ui/button";
import ActionTooltip from "../shared/ActionTooltip";
import {useState} from "react";

const CopyAction = () => {
	const [copied, setCopied] = useState(false);
	const copyUrl = () => {
		navigator.clipboard.writeText(String(window.location)).then(() => {
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 1500);
		});
	};

	return (
		<ActionTooltip
			side='bottom'
			align='center'
			label='Cкопировать URL'
			classNames='mt-2'
		>
			<Button
				className='min-w-[170px]'
				disabled={copied}
				onClick={copyUrl}
				variant='video'
			>
				{copied ? (
					<CheckCheck className='icon_5 !text-white' />
				) : (
					<Copy className='icon_5 text-zinc-300' />
				)}
				{copied ? "Скопировано" : "Скопировать"}
			</Button>
		</ActionTooltip>
	);
};
export default CopyAction;
