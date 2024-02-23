"use client";
import {usePlayer} from "@/hooks/usePlayer";
import {PauseIcon, PlayIcon} from "lucide-react";

const VideoPause = () => {
	const {isPaused, setIsPaused} = usePlayer();
	return isPaused ? (
		<button onClick={() => setIsPaused(false)}>
			<PlayIcon
				fill='white'
				className='player__icon'
			/>
		</button>
	) : (
		<button onClick={() => setIsPaused(true)}>
			<PauseIcon
				fill='white'
				className='player__icon'
			/>
		</button>
	);
};
export default VideoPause;
