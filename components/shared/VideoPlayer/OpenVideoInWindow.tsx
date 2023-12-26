"use client";
import {PictureInPicture2} from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import {usePlayer} from "@/hooks/usePlayer";
import {useRouter} from "next/navigation";
import {useVideoBottom} from "@/hooks/useVideoBottom";

const OpenVideoInWindow = ({videoData}: any) => {
	const {currentVolume, setVolumeMuted, videoRef} = usePlayer();
	const router = useRouter();
	const {setIsOpen} = useVideoBottom();

	const data = {
		currentTime: videoRef?.current && videoRef.current.currentTime,
		currentVolume,
		...videoData,
	};

	const openVideoInWindow = () => {
		setIsOpen(true, data);
		setVolumeMuted(true);
		router.push("/");
	};
	return (
		<ActionTooltip
			classNames='mb-2'
			align='center'
			label='Видео в окне'
		>
			<button onClick={openVideoInWindow}>
				<PictureInPicture2 className='player__icon' />
			</button>
		</ActionTooltip>
	);
};
export default OpenVideoInWindow;
