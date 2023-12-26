// Хук делает снимок превью кадра
interface UseShootProps {
	setSnapshots: React.Dispatch<React.SetStateAction<string>>;
	setHoveredSecond: React.Dispatch<React.SetStateAction<string>>;
	setStyle: React.Dispatch<React.SetStateAction<number>>;
	setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
	progressBarRef: React.RefObject<HTMLDivElement>;
	videoDuration: number;
	secondVideoRef: React.RefObject<HTMLVideoElement>;
}

const useShoot = ({
	setSnapshots,
	setHoveredSecond,
	setStyle,
	setIsHover,
	progressBarRef,
	videoDuration,
	secondVideoRef,
}: UseShootProps) => {
	const onSliderHover = (event: React.MouseEvent<HTMLDivElement>) => {
		setSnapshots("");
		if (!progressBarRef.current) return;
		const progressBarWidth = progressBarRef.current.offsetWidth;

		const clickX =
			event.clientX - progressBarRef.current.getBoundingClientRect().left;

		const progressPercentage = (clickX / progressBarWidth) * 100;
		if (progressPercentage < 10) {
			setStyle(10);
		} else if (progressPercentage > 90) {
			setStyle(90);
		} else {
			setStyle(progressPercentage);
		}

		setIsHover(true);

		// Процент выполнения в секундах (заменить на уни функцию)
		const secondsInProcents = (progressPercentage / 100) * videoDuration;
		const minutes = Math.floor(secondsInProcents / 60);
		const seconds = Math.floor(secondsInProcents % 60);
		const formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
		setHoveredSecond(formattedTime);

		// shoot baby
		if (secondVideoRef?.current) {
			secondVideoRef.current.currentTime = secondsInProcents;
			shoot(secondVideoRef.current);
		}
	};

	const shoot = (video: HTMLVideoElement) => {
		let canvas = capture(video);
		if (
			canvas.getAttribute("width") === "0" ||
			canvas.getAttribute("height") === "0"
		) {
			return setSnapshots("");
		}
		setSnapshots(canvas.toDataURL());
	};

	// lets capture dat shit
	const capture = (video: HTMLVideoElement) => {
		let canvas = document.createElement("canvas");
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		let ctx = canvas.getContext("2d");
		ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
		return canvas;
	};

	const onOutsideSlider = () => {
		setSnapshots("");
		setIsHover(false);
	};

	return {
		onSliderHover,
		onOutsideSlider,
	};
};
export default useShoot;
