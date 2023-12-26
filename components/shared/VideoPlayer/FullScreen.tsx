"use client";
import {Maximize} from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import {usePlayer} from "@/hooks/usePlayer";

const FullScreen = () => {
	const {toggleFullscreen} = usePlayer();
	return (
		<ActionTooltip
			classNames='mb-2'
			align='center'
			label='Во весь экран'
		>
			<button
				className='cursor-pointer'
				onClick={toggleFullscreen}
			>
				<Maximize className='player__icon' />
			</button>
		</ActionTooltip>
	);
};
export default FullScreen;
