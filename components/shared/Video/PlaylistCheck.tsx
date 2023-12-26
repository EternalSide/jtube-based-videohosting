"use client";
import {useState} from "react";
import {Checkbox} from "../../ui/checkbox";

const PlaylistCheck = ({addVideoToPlaylist, item, videoId}: any) => {
	const [isInPlaylist, setisInPlaylist] = useState(
		item?.videos && item.videos.includes(videoId)
	);

	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				checked={isInPlaylist}
				onClick={() => {
					setisInPlaylist(!isInPlaylist);
					addVideoToPlaylist(item._id.toString(), item.name, isInPlaylist);
				}}
				id={item._id}
			/>
			<label
				htmlFor={item._id}
				className='text-white font-medium  w-full cursor-pointer'
			>
				{item.name}
			</label>
		</div>
	);
};
export default PlaylistCheck;
