"use server";
import Video from "@/database/models/video.model";
import {connectToDb} from "../mongoose";
import User from "@/database/models/user.model";
import {revalidatePath} from "next/cache";
import {
	AddToHistoryParams,
	GetVideoByIdParams,
	HandleLikeActionParams,
	IncreaseVideoViewParams,
	LeaveCommentParams,
	UploadVideoParams,
} from "./types/shared.types";
import Comment from "@/database/models/comment.schema";
import Notification from "@/database/models/nofication.model";
import Tag from "@/database/models/tag.model";
import Playlist from "@/database/models/playlist.model";

export const uploadVideo = async (params: UploadVideoParams) => {
	try {
		await connectToDb();
		const {values, path} = params;
		const {video_title, video_description, videoUrl, videoPreviewUrl, author} =
			values;

		// По хорошему принимать изначальный mongo userId здесь с фронта, пока-что принимаем clerk id.
		const user = await User.findOne({clerkId: author});
		if (!user) throw new Error();

		const newVideo = await Video.create({
			video_title,
			video_description,
			videoUrl,
			videoPreviewUrl,
			author: user._id,
		});

		user.videos.push(newVideo._id);

		await user.save();

		// Добавить в тег видос и создать тег, если его нету.
		const {tags} = values;
		const tagDocuments = [];

		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{name: {$regex: new RegExp(`^${tag}$`, "i")}},
				{
					$setOnInsert: {name: tag},
					$push: {videos: newVideo._id},
				},
				{upsert: true, new: true}
			);

			tagDocuments.push(existingTag._id);
		}
		// Добавить теги видосу
		const videoId = newVideo._id.toString();

		await Video.findByIdAndUpdate(videoId, {
			$push: {tags: {$each: tagDocuments}},
		});

		revalidatePath(path);
		return newVideo._id;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getVideoById = async (params: GetVideoByIdParams) => {
	try {
		connectToDb();

		const {videoId} = params;

		const video = await Video.findOne({_id: videoId})
			.populate({
				path: "author",
				select: "_id name username picture followers",
			})
			.populate({
				path: "tags",
				select: "_id name",
			})
			.populate({
				path: "comments",
				select: "text createdAt upvotes downvotes",
				options: {
					populate: [
						{
							path: "author",
							select: "username picture",
						},
						{
							path: "children",
							select: "_id",
						},
					],
					sort: {
						createdAt: -1,
					},
				},
			});

		if (!video) return null;

		return video;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const increaseVideoView = async (params: IncreaseVideoViewParams) => {
	try {
		connectToDb();

		const {videoId} = params;

		const video = await Video.findByIdAndUpdate(videoId, {$inc: {views: 1}});

		if (!video) return null;

		return video;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const addToHistory = async (params: AddToHistoryParams) => {
	try {
		connectToDb();

		const {videoId, userId} = params;

		const user = await User.findOne({clerkId: userId});

		if (user.options.saveHistory === false) return;

		let isWatched = user.watchedHistory.includes(videoId);

		if (!isWatched) {
			user.watchedHistory.unshift(videoId);
			await user.save();
		} else {
			const newWatchedArray = user.watchedHistory.filter(
				(item: any) => item._id.toString() !== videoId
			);

			const newArray = [videoId, ...newWatchedArray];

			newWatchedArray.push(videoId);

			await User.findByIdAndUpdate(user._id, {
				$set: {
					watchedHistory: newArray,
				},
			});
		}

		return user.watchedHistory;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getTopVideos = async (params?: any) => {
	try {
		connectToDb();

		const {page = 1} = params;
		const pageLimit = 8;

		const skipAmount = (page - 1) * pageLimit;

		if (params?.mainPage) {
			const topVideos = await Video.find({})
				.populate({
					path: "author",
					select: "name username picture",
				})
				.sort({
					views: -1,
					upvotes: -1,
				})
				.limit(3);

			return JSON.parse(JSON.stringify(topVideos));
		} else {
			const topVideos = await Video.find({})
				.populate({
					path: "author",
					select: "name username picture",
				})
				.sort({
					views: -1,
					upvotes: -1,
				})
				.limit(pageLimit)
				.skip(skipAmount);

			return JSON.parse(JSON.stringify(topVideos));
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getMoreVideos = async (params: any) => {
	try {
		connectToDb();

		const {sortBy, page} = params;

		const pageLimit = 16;

		const skipAmount = 0;

		let sortQuery = {};

		switch (sortBy) {
			case "new": {
				sortQuery = {
					createdAt: -1,
				};
				break;
			}
			case "old": {
				sortQuery = {
					createdAt: 1,
				};
				break;
			}
			case "popular": {
				sortQuery = {
					views: -1,
				};
				break;
			}

			default:
				{
					sortQuery = {
						createdAt: -1,
					};
				}
				break;
		}

		const videos = await Video.find({})
			.populate({
				path: "author",
				select: "username",
			})
			.sort(sortQuery)
			.select("video_title videoPreviewUrl views")
			.limit(pageLimit)
			.skip(skipAmount);

		return JSON.parse(JSON.stringify(videos));
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getNewVideos = async (params?: any) => {
	try {
		await connectToDb();

		if (params?.mainPage) {
			const newVideos = await Video.find({})
				.populate({
					path: "author",
					select: "name username picture",
				})
				.sort({
					createdAt: -1,
				})
				.limit(8);

			return newVideos;
		} else {
			const newVideos = await Video.find({})
				.populate({
					path: "author",
					select: "name username picture",
				})
				.sort({
					createdAt: -1,
				})
				.limit(16);

			return newVideos;
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const handleLikeAction = async (params: HandleLikeActionParams) => {
	try {
		connectToDb();

		const {path, currentUserId, isLiked, videoId, type, isDisliked} = params;

		let updateQuery = {};

		if (type === "like") {
			if (isLiked) {
				updateQuery = {
					$pull: {
						upvotes: currentUserId,
					},
				};
			} else if (isDisliked) {
				updateQuery = {
					$pull: {
						downvotes: currentUserId,
					},
					$addToSet: {
						upvotes: currentUserId,
					},
				};
			} else {
				updateQuery = {
					$addToSet: {
						upvotes: currentUserId,
					},
				};
				const newNotification = await Notification.create({
					type: "video_like",
					user: currentUserId,
					video: videoId,
				});

				await User.findByIdAndUpdate(currentUserId, {
					$addToSet: {
						notifications: newNotification._id,
					},
				});
			}
		} else {
			if (isDisliked) {
				updateQuery = {
					$pull: {
						downvotes: currentUserId,
					},
				};
			} else if (isLiked) {
				updateQuery = {
					$pull: {
						upvotes: currentUserId,
					},
					$addToSet: {
						downvotes: currentUserId,
					},
				};
			} else {
				updateQuery = {
					$addToSet: {
						downvotes: currentUserId,
					},
				};
			}
		}

		await Video.findByIdAndUpdate(videoId, updateQuery);

		revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
};

export async function leaveComment(params: LeaveCommentParams) {
	try {
		await connectToDb();

		const {path, userId, videoId, text, authorId} = params;

		const newComment = await Comment.create({
			text,
			author: userId,
			video: videoId,
		});

		await Video.findByIdAndUpdate(videoId, {
			$push: {
				comments: newComment._id,
			},
		});

		const newNotification = await Notification.create({
			type: "video_comment",
			user: userId,
			video: videoId,
			text,
		});

		await User.findByIdAndUpdate(authorId, {
			$push: {
				notifications: newNotification._id,
			},
		});

		return revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
}

export async function findVideos(params?: any) {
	try {
		await connectToDb();

		const {tag, searchByQuery, query} = params;

		const regexQuery = {$regex: query, $options: "i"};

		if (searchByQuery) {
			const videos = await Video.find({video_title: regexQuery})
				.populate({
					path: "author",
					model: User,
				})
				.sort({
					createdAt: -1,
				});

			if (!videos)
				return {
					videos: [],
				};

			return {videos};
		} else {
			const tagData = await Tag.findOne({name: tag}).populate({
				path: "videos",
				model: Video,
				options: {
					populate: {
						path: "author",
						model: User,
					},
					sort: {
						createdAt: -1,
					},
				},
			});

			if (!tagData)
				return {
					videos: [],
				};

			return {videos: tagData.videos};
		}
	} catch (e) {
		console.log(e);
	}
}

export async function getAllVideos(params: any) {
	try {
		await connectToDb();

		const {page} = params;

		const skipAmount = (page - 1) * 12;

		const videos = await Video.find({})
			.populate({path: "author"})
			.sort({
				createdAt: -1,
			})
			.skip(skipAmount)
			.limit(12);

		if (!videos)
			return {
				videos: [],
			};

		return JSON.parse(JSON.stringify(videos));
	} catch (e) {
		console.log(e);
	}
}

export async function addVideoInPlaylistDb(params: any) {
	try {
		await connectToDb();

		const {path, playListId, videoId, isInPlaylist} = params;

		let updateQuery = {};

		if (isInPlaylist) {
			updateQuery = {
				$pull: {
					videos: videoId,
				},
			};
		} else {
			updateQuery = {
				$addToSet: {
					videos: videoId,
				},
			};
		}

		await Playlist.findByIdAndUpdate(playListId, updateQuery);

		return revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
}
