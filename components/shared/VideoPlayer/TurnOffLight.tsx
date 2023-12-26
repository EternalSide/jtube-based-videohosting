"use client";
import {useOverlay} from "@/hooks/useOverlay";
import ActionTooltip from "../ActionTooltip";
import {Moon} from "lucide-react";

const TurnOffLight = () => {
	const {isOverlayOpen, setOverlayOpen} = useOverlay();

	return (
		<ActionTooltip
			classNames='mb-2'
			align='center'
			label={isOverlayOpen ? "Включить свет" : "Выключить свет"}
		>
			<button onClick={() => setOverlayOpen(!isOverlayOpen)}>
				<Moon
					fill={isOverlayOpen ? "white" : "none"}
					className='player__icon'
				/>
			</button>
		</ActionTooltip>
	);
};
export default TurnOffLight;
