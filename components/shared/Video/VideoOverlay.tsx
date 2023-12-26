"use client";

import {useOverlay} from "@/hooks/useOverlay";
import {useEffect} from "react";

const VideoOverlay = () => {
	const {isOverlayOpen, setOverlayOpen} = useOverlay();

	useEffect(() => {
		const handleScroll = () => window.scrollTo(0, 0);
		if (isOverlayOpen) {
			document.addEventListener("scroll", handleScroll);
		}

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [isOverlayOpen]);

	return (
		<div
			onClick={() => setOverlayOpen(false)}
			className={`opacity-0 transition-all duration-500 fixed top-0 left-0 h-screen w-screen bg-black/90 -z-[1000] ${
				isOverlayOpen && "!visible !opacity-100 cursor-pointer !z-[1000]"
			}`}
		/>
	);
};
export default VideoOverlay;
