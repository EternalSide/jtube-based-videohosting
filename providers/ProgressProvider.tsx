import {formatVideoTime, getSecondsFromWidth} from "@/lib/utils";
import React, {createContext, useState, useCallback} from "react";

export const ProgressContext = createContext<any | undefined>(undefined);

export function ProgressProvider({children, videoRef, progressBarRef}: any) {
	const [videoDuration, setVideoDuration] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isBuffering, setBuffering] = useState(false);
	const [videoCurrentTime, setVideoCurrentTime] = useState("0:00");

	const handleVideoUpdate = useCallback(
		(e: React.ChangeEvent<HTMLVideoElement>) => {
			const formattedTime = formatVideoTime(e);
			setVideoCurrentTime(formattedTime);
		},
		[videoRef]
	);

	const handleUpdateProgress = useCallback(
		(e: React.ChangeEvent<HTMLVideoElement>) => {
			e.preventDefault();
			setVideoDuration(e.target.duration);
			setProgress((e.target.currentTime / e.target.duration) * 100);
			handleVideoUpdate(e);
		},
		[handleVideoUpdate]
	);

	// Клик на прогресс бар
	const handleProgressBarClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (progressBarRef.current) {
				const seconds = getSecondsFromWidth(e, progressBarRef, videoDuration);

				setBuffering(true);

				setProgress((seconds / videoDuration) * 100);

				if (videoRef?.current) {
					videoRef.current.currentTime = seconds;
					videoRef.current.frame = seconds;
				}
			}
		},
		[progressBarRef, videoRef, videoDuration, handleVideoUpdate]
	);

	const handleBuffering = () => setBuffering(false);

	// progress dragging
	const handleProgressBarDragStart = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();

			if (progressBarRef?.current && videoRef?.current) {
				const progressBar = progressBarRef.current;
				const video = videoRef.current;

				const handleMouseMove = (e: any) => {
					const progressBarRect = progressBar.getBoundingClientRect();
					const clickX = e.clientX - progressBarRect.left;
					const progressPercentage = (clickX / progressBarRect.width) * 100;
					if (progressPercentage >= 0 && progressPercentage <= 100) {
						setProgress(progressPercentage);
						video.currentTime = (progressPercentage / 100) * videoDuration;
					}
				};

				const handleMouseUp = () => {
					document.removeEventListener("mousemove", handleMouseMove);
					document.removeEventListener("mouseup", handleMouseUp);
				};

				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			}
		},
		[progressBarRef, videoRef, videoDuration, handleVideoUpdate]
	);

	return (
		<ProgressContext.Provider
			value={{
				progress,
				videoDuration,
				videoCurrentTime,
				handleUpdateProgress,
				handleProgressBarClick,
				handleProgressBarDragStart,
				handleBuffering,
				isBuffering,
				setBuffering,
				progressBarRef,
			}}
		>
			{children}
		</ProgressContext.Provider>
	);
}
