"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
	label: string;
	children: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	classNames?: string;
}

const ActionTooltip = ({
	label,
	children,
	side,
	align,
	classNames,
}: ActionTooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					className={`border-none bg-neutral-800 ${classNames}`}
					side={side}
					align={align}
				>
					<p className='text-sm'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
export default ActionTooltip;
