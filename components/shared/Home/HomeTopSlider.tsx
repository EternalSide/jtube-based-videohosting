"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import HomeVideoBanner from "./HomeVideoBanner";
import {useVideoBottom} from "@/hooks/useVideoBottom";

export default function HomeTopSlider() {
	const [isMounted, setIsMounted] = useState(false);
	const [activeSlide, setActiveSlide] = useState(0);
	const {setIsOpen} = useVideoBottom();

	const videos = [
		{
			href: "video/6581559d2284b8c6cdb20619",
			title: "Егор Крид - ТAPO ft. Tenderlybae, Егорик🔥",
			videoUrl:
				"https://files.edgestore.dev/s863vgoz59ii0hbb/videos/_public/d4e7df06-9ad1-41c1-b212-7e15f861a88e.mp4",
			position: 0,
		},
		{
			href: "video/653a1598f32014084d340dfc",
			title: "vendetta! - Sadfriendd x Mupp 🔥",
			videoUrl:
				"https://files.edgestore.dev/s863vgoz59ii0hbb/videos/_public/06495f21-76af-4307-b0c1-a08d54f2217e.mp4",
			position: 1,
		},
		{
			href: "video/653a1bf2f32014084d340f67",
			title: "Scally Milano, uglystephan - Вампир",
			videoUrl:
				"https://files.edgestore.dev/s863vgoz59ii0hbb/videos/_public/bb440ade-884d-40fe-b04c-43d71d5e3112.mp4",
			position: 2,
		},
	];

	type VideoType = (typeof videos)[0];

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Swiper
			className='mySwiper'
			slidesPerView={1}
			spaceBetween={10}
			onSlideChange={(e) => setActiveSlide(e.activeIndex)}
			autoplay={{
				delay: 1200,
			}}
			loop={true}
			pagination={{
				clickable: true,
			}}
			navigation={true}
			modules={[Pagination, Navigation]}
		>
			{videos.map((item: VideoType) => (
				<SwiperSlide key={item.href}>
					<HomeVideoBanner
						videoUrl={item.href}
						activeSlide={activeSlide}
						position={item.position}
						fileUrl={item.videoUrl}
						title={item.title}
						setIsOpen={setIsOpen}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
