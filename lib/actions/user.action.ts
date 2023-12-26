"use server";
import User from "@/database/models/user.model";
import {connectToDb} from "../mongoose";
import Video from "@/database/models/video.model";
import {revalidatePath} from "next/cache";
import {
	ClearUserHistoryParams,
	CreateUserParams,
	GetUserByUsernameParams,
	GetUserFollowingsVideosParams,
	GetWatchedHistoryParams,
	HandleAddToWatchedListParams,
	HandleFollowUserParams,
	HandleUserHistoryParams,
} from "./types/shared.types";
import {FilterQuery} from "mongoose";
import Notification from "@/database/models/nofication.model";
import Playlist from "@/database/models/playlist.model";

export const createUser = async (userData: CreateUserParams) => {
	try {
		connectToDb();

		const user = await User.create(userData);

		return user;
	} catch (e) {
		console.log(e);
	}
};

export const getUserById = async (clerkId: string) => {
	try {
		connectToDb();

		const user = await User.findOne({clerkId}).populate({
			path: "followingIds",
			select: "_id username picture name",
		});

		if (!user) return null;

		return JSON.parse(JSON.stringify(user));
	} catch (error) {}
};

export const getUserByUsername = async (params: GetUserByUsernameParams) => {
	try {
		connectToDb();

		const {username, sortOptions, searchQuery = ""} = params;

		let sortQuery = {};
		const regexQuery = {$regex: searchQuery, $options: "i"};

		switch (sortOptions) {
			case "new":
				sortQuery = {createdAt: -1};
				break;

			case "popular":
				sortQuery = {views: -1};
				break;

			case "old":
				sortQuery = {createdAt: 1};
				break;

			default:
				sortQuery = {createdAt: -1};
				break;
		}

		const user = await User.findOne({username}).populate({
			path: "videos",
			model: Video,
			select: "video_title views videoPreviewUrl",
			match: {
				video_title: regexQuery,
			},
			options: {
				sort: sortQuery,
			},
		});

		if (!user) return null;

		return user;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getWatchedHistory = async (params: GetWatchedHistoryParams) => {
	try {
		connectToDb();

		const {userId, searchParams, page} = params;

		let pageLimit = 6;
		console.log(page);
		// @ts-ignore
		let skipAmount = (page - 1) * pageLimit;

		const query: FilterQuery<typeof Video> = {};

		if (searchParams) {
			query.$or = [
				{
					video_title: {$regex: new RegExp(searchParams, "i")},
				},
			];
		}

		const user = await User.findOne({clerkId: userId}).populate({
			path: "watchedHistory",
			select:
				"video_title _id video_description views videoPreviewUrl createdAt",
			match: query,

			options: {
				populate: {
					path: "author",
					select: "username name picture",
				},
				skip: skipAmount,
				limit: pageLimit,
			},
		});

		if (!user) return null;

		return {
			history: JSON.parse(JSON.stringify(user.watchedHistory)),
			id: user._id.toString(),
			isSavingHistory: user.options.saveHistory,
		};
	} catch (e) {
		console.log(e);
	}
};

export const handleFollowUser = async (params: HandleFollowUserParams) => {
	try {
		connectToDb();

		const {isFollowing, userId, currentUserId, path} = params;

		let updateQueryForUser = {};
		let updateQueryForCurrentUser = {};

		if (!isFollowing) {
			updateQueryForUser = {$addToSet: {followers: currentUserId}};

			updateQueryForCurrentUser = {$addToSet: {followingIds: userId}};
		} else {
			updateQueryForUser = {$pull: {followers: currentUserId}};

			updateQueryForCurrentUser = {$pull: {followingIds: userId}};
		}

		await User.findByIdAndUpdate(userId, updateQueryForUser);

		await User.findByIdAndUpdate(currentUserId, updateQueryForCurrentUser);

		revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
};

export const getSavedVideos = async (params: GetWatchedHistoryParams) => {
	try {
		connectToDb();

		const {userId} = params;

		const user = await User.findOne({clerkId: userId}).populate({
			path: "savedVideos",
			select:
				"video_title _id video_description views videoPreviewUrl createdAt",
			options: {
				populate: {
					path: "author",
					select: "username name picture",
				},
			},
		});

		if (!user) return null;

		return user.savedVideos;
	} catch (e) {
		console.log(e);
	}
};

export const getUserNotifications = async (params: any) => {
	try {
		connectToDb();

		const {clerkId} = params;

		const user = await User.findOne({clerkId}).populate({
			path: "notifications",
			model: Notification,
			options: {
				populate: [
					{
						path: "user",
						select: "name username picture",
					},
					{
						path: "video",
						select: "_id video_title videoPreviewUrl",
					},
				],
				sort: {
					createdAt: -1,
				},
			},
		});

		return JSON.parse(JSON.stringify(user.notifications));
	} catch (e) {
		console.log(e);
	}
};

export const getUserFollowingsVideos = async (
	params: GetUserFollowingsVideosParams
) => {
	try {
		connectToDb();

		const {userId} = params;

		const user = await User.findOne({clerkId: userId}).populate({
			path: "followingIds",
			options: {
				populate: {
					path: "videos",
					select: "_id video_title videoPreviewUrl views createdAt",
					options: {
						populate: {
							path: "author",
							select: "username name picture",
						},
					},
				},
			},
		});

		const videos = user.followingIds.map((item: any) => item.videos);

		if (!user) return null;

		return videos[0];
	} catch (e) {
		console.log(e);
	}
};

export const handleAddToWatchedList = async (
	params: HandleAddToWatchedListParams
) => {
	try {
		connectToDb();

		const {inWatchedList, currentUserId, path, videoId} = params;

		let updateQueryForCurrentUser = {};

		if (!inWatchedList) {
			updateQueryForCurrentUser = {$addToSet: {savedVideos: videoId}};
		} else {
			updateQueryForCurrentUser = {$pull: {savedVideos: videoId}};
		}

		await User.findByIdAndUpdate(currentUserId, updateQueryForCurrentUser);

		revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
};

export const clearUserHistory = async (params: ClearUserHistoryParams) => {
	try {
		connectToDb();

		const {userId, path} = params;

		await User.findByIdAndUpdate(userId, {$set: {watchedHistory: []}});

		revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
};

export const handleUserHistory = async (params: HandleUserHistoryParams) => {
	try {
		connectToDb();

		const {userId, path, isSavingHistory} = params;

		let updateQuery = {};

		if (!isSavingHistory) {
			updateQuery = {
				"options.saveHistory": true,
			};
		} else {
			updateQuery = {
				"options.saveHistory": false,
				$set: {
					watchedHistory: [],
				},
			};
		}

		const user = await User.findByIdAndUpdate(userId, updateQuery, {new: true});

		if (!user) throw new Error();

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const updateUser = async (params: any) => {
	try {
		const {clerkId, updatedData, path} = params;
		console.log(updatedData);
		await User.findOneAndUpdate({clerkId}, updatedData);
		return revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const handleUserBg = async (params: any) => {
	try {
		const {userId, background, pathname} = params;

		await User.findByIdAndUpdate(userId, {background});

		return revalidatePath(pathname);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const uploadUserAvatar = async (params: any) => {
	try {
		const {userId, avatar, pathname} = params;

		await User.findByIdAndUpdate(userId, {picture: avatar});

		return revalidatePath(pathname);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getUserPlaylists = async (params: any) => {
	try {
		if (params.clerkId) {
			const user = await User.findOne({clerkId: params.clerkId}).populate({
				path: "playlists",
				model: Playlist,
				options: {
					sort: {
						createdAt: -1,
					},
					populate: {
						path: "videos",
						model: Video,
					},
				},
			});

			return JSON.parse(JSON.stringify(user.playlists));
		} else {
			const user = await User.findById(params.userId).populate({
				path: "playlists",
				model: Playlist,
				options: {
					sort: {
						createdAt: -1,
					},
				},
			});

			return JSON.parse(JSON.stringify(user.playlists));
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
};
