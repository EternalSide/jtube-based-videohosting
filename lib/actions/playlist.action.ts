"use server";
import Playlist from "@/database/models/playlist.model";
import {connectToDb} from "../mongoose";
import User from "@/database/models/user.model";
import {revalidatePath} from "next/cache";
import Video from "@/database/models/video.model";

export async function deletePlaylist(params: any) {
	try {
		await connectToDb();

		const {path, playlistId, userId} = params;

		await Playlist.findByIdAndDelete(playlistId);

		await User.findOneAndUpdate(
			{clerkId: userId},
			{
				$pull: {
					playlists: playlistId,
				},
			}
		);

		return revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
}

export async function getPlaylistInfo(params: any) {
	try {
		await connectToDb();

		const {id} = params;

		const playList = await Playlist.findById(id)
			.populate({
				path: "videos",
				model: Video,
				options: {
					populate: {
						path: "author",
						select: "username",
					},
				},
			})
			.populate({
				path: "user",
				model: User,
				options: {
					select: "username",
				},
			});

		if (!playList) {
			return {
				playlist: null,
				firstVideo: null,
			};
		}

		const firstVideo =
			playList.videos && playList.videos.length > 0
				? playList.videos[playList.videos.length - 1]._id.toString()
				: null;

		return {
			playlist: JSON.parse(JSON.stringify(playList)),
			firstVideo,
		};
	} catch (e) {
		console.log(e);
	}
}

export const addNewPlaylistToDB = async (params: any) => {
	try {
		const {userId, name, path, picture} = params;

		const newPlaylist = await Playlist.create({
			name,
			user: userId,
			picture,
		});

		await User.findByIdAndUpdate(userId, {
			$push: {
				playlists: newPlaylist._id,
			},
		});

		revalidatePath(path);

		return newPlaylist;
	} catch (e) {
		console.log(e);
		throw e;
	}
};
