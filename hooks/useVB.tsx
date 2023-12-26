// Связь между основным видео и мини плеером снизу
import {useEffect} from "react";

const useVB = ({
	pathname,
	videoRef,
	isPaused,
	setIsPaused,
	isOpen,
	setIsOpen,
	data,
}: any) => {
	useEffect(() => {
		if (videoRef?.current) {
			if (isPaused) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
		}
	}, [isPaused]);

	useEffect(() => {
		if (pathname.includes("video")) {
			setIsOpen(false);
		}
	}, [pathname]);

	useEffect(() => {
		if (data.currentTime && videoRef.current) {
			videoRef.current.currentTime = data.currentTime + 1;
			videoRef.current.volume = data.currentVolume;
		}
	}, [data.currentTime, videoRef.current]);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
			setIsPaused(false);
		}
	}, [isOpen]);
};
export default useVB;
