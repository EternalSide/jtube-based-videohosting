"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import {useVideoBottom} from "./useVideoBottom";
import {findAndInspectPlaylistOrder} from "@/lib/utils";

interface ProviderProps {
	children: React.ReactNode;
	videoRef: React.RefObject<HTMLVideoElement> | any;
	containerRef: React.RefObject<HTMLDivElement> | any;
	progressBarRef: React.RefObject<HTMLDivElement> | any;
	volumeRef: React.RefObject<HTMLDivElement> | any;
}

const PlayerContext = createContext<any | undefined>(undefined);

export function PlayerProvider({
	children,
	videoRef,
	containerRef,
	progressBarRef,
	volumeRef,
}: ProviderProps) {
	const [isPaused, setIsPaused] = useState(false);
	const [volumeMuted, setVolumeMuted] = useState(false);
	const [currentVolume, setCurrentVolume] = useState<number | string>(1);
	const [prevVolume, setPrevVolume] = useState(0);
	const {data} = useVideoBottom();

	useEffect(() => {
		if (currentVolume === 0) {
			setVolumeMuted(true);
		} else {
			setVolumeMuted(false);
		}
	}, [currentVolume]);

	const handleMuteVolume = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (!videoRef.current) return null;
			if (!volumeMuted) {
				setPrevVolume(videoRef.current.volume);
				setVolumeMuted(true);
				videoRef.current.volume = 0;
				setCurrentVolume(0);
				localStorage.setItem("volume", "0");
			} else {
				setVolumeMuted(false);
				setCurrentVolume(prevVolume);
				videoRef.current.volume = prevVolume;
			}
		},
		[volumeMuted, prevVolume, videoRef]
	);

	useEffect(() => {
		const volumeValue = localStorage.getItem("volume");

		if (volumeValue && videoRef.current) {
			videoRef.current.volume = volumeValue;
			setCurrentVolume(volumeValue);
			if (volumeValue === "0") {
				setCurrentVolume(0);
				setVolumeMuted(true);
			}
		}
	}, [videoRef.current]);

	const handleVolumeClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (volumeRef?.current && videoRef?.current) {
				// Ширина прогресс-бара
				const volumeBarWidth = volumeRef.current.offsetWidth;

				// Позиция клика
				const clickX = Math.max(
					0,
					Math.min(
						event.clientX - volumeRef.current.getBoundingClientRect().left,
						volumeBarWidth
					)
				);

				const volumePercentage = clickX / 100;

				const volume = volumePercentage < 0.05 ? 0 : volumePercentage;

				setCurrentVolume(volume);
				videoRef.current.volume = volume;
				localStorage.setItem("volume", String(volume));
			}
		},
		[volumeRef, videoRef]
	);

	const handleVolumeDrag = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();

			if (volumeRef?.current && videoRef?.current) {
				const volumeBar = volumeRef.current;
				const video = videoRef.current;

				const handleMouseMove = (e: any) => {
					const volumeBarRect = volumeBar.getBoundingClientRect();
					const clickX = e.clientX - volumeBarRect.left;
					const volumePercentage = clickX / 100;

					if (volumePercentage <= 1 && volumePercentage >= 0) {
						const volume = volumePercentage < 0.05 ? 0 : volumePercentage;
						setCurrentVolume(volume);
						video.volume = volume;
						localStorage.setItem("volume", String(volume));
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
		[volumeRef, videoRef]
	);

	useEffect(() => {
		if (videoRef?.current) {
			if (isPaused) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
		}
	}, [isPaused]);

	const handleVideoClick = () => {
		if (!isPaused) {
			setIsPaused(true);
		} else {
			setIsPaused(false);
		}
	};

	// Привязка к времени при переключение видео в окне
	useEffect(() => {
		if (data.currentTime && videoRef.current) {
			videoRef.current.currentTime = data.currentTime;
		}
	}, [data.currentTime]);

	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = useCallback(() => {
		const videoElement = containerRef.current;

		if (videoElement && containerRef?.current) {
			if (!isFullscreen) {
				if (videoElement.requestFullscreen) {
					videoElement.requestFullscreen();
				} else if (videoElement.mozRequestFullScreen) {
					videoElement.mozRequestFullScreen();
				} else if (videoElement.webkitRequestFullscreen) {
					videoElement.webkitRequestFullscreen();
				} else if (videoElement.msRequestFullscreen) {
					videoElement.msRequestFullscreen();
				}
			} else {
				if (isFullscreen && document) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
			setIsFullscreen(!isFullscreen);
		}
	}, [containerRef, isFullscreen, setIsFullscreen]);

	useEffect(() => {
		const handleDbClick = (e: any) => {
			if (isFullscreen && videoRef.current) {
				if (
					videoRef.current.contains(e.target) &&
					!progressBarRef.current.contains(e.target)
				) {
					toggleFullscreen();
				}
			} else {
				if (
					containerRef.current.contains(e.target) &&
					!progressBarRef.current.contains(e.target)
				) {
					toggleFullscreen();
				}
			}
		};
		document.addEventListener("dblclick", handleDbClick);

		return () => {
			document.removeEventListener("dblclick", handleDbClick);
		};
	}, [videoRef, isFullscreen]);

	const handleChangeTime = useCallback(
		(action: "back" | "forward") => {
			if (videoRef) {
				if (action === "back") {
					return (videoRef.current.currentTime =
						videoRef.current.currentTime - 15);
				}
				if (action === "forward") {
					return (videoRef.current.currentTime =
						videoRef.current.currentTime + 15);
				}
			}
		},
		[videoRef]
	);

	const handleChangeSpeed = (speedValue: number) => {
		if (videoRef.current) return (videoRef.current.playbackRate = speedValue);
	};

	useEffect(() => {
		if (data.currentTime) {
			videoRef.current.currentTime = data.currentTime;
		}
	}, [data]);

	const player = {
		isPaused,
		setIsPaused,
		volumeMuted,
		setVolumeMuted,
		toggleFullscreen,
		currentVolume,
		setCurrentVolume,
		handleVolumeClick,
		handleVolumeDrag,
		handleVideoClick,
		handleMuteVolume,
		handleChangeTime,
		handleChangeSpeed,
		videoRef,
		findAndInspectPlaylistOrder,
		volumeRef,
	};

	return (
		<PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
	);
}

export const usePlayer = () => {
	const player = useContext(PlayerContext);

	if (player === undefined) {
		throw new Error("Ошибка, не найден PlayerProvider");
	}

	return player;
};
