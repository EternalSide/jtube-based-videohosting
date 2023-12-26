"use server";
import Comment from "@/database/models/comment.schema";
import {connectToDb} from "../mongoose";
import {revalidatePath} from "next/cache";
import Notification from "@/database/models/nofication.model";
import Video from "@/database/models/video.model";
import User from "@/database/models/user.model";

export const handleCommentLike = async (params: any) => {
	try {
		await connectToDb();

		const {
			userId,
			commentId,
			isLiked,
			isDisliked,
			path,
			videoId,
			text,
			notMainComment,
		} = params;

		let updateQuery = {};

		if (isLiked) {
			updateQuery = {
				$pull: {
					upvotes: userId,
				},
			};
		} else if (isDisliked) {
			updateQuery = {
				$addToSet: {
					upvotes: userId,
				},
				$pull: {
					downvotes: userId,
				},
			};
		} else {
			updateQuery = {
				$addToSet: {
					upvotes: userId,
				},
			};

			if (!notMainComment) {
				const newNotification = await Notification.create({
					type: "comment_like",
					user: userId,
					video: videoId,
					text,
				});
				const video = await Video.findById(videoId).populate("author");

				await User.findByIdAndUpdate(video.author._id, {
					$addToSet: {
						notifications: newNotification._id,
					},
				});
			}
		}

		await Comment.findByIdAndUpdate(commentId, updateQuery);
		if (!notMainComment) {
			return revalidatePath(path);
		}
		return;
	} catch (e) {
		console.log(e);
	}
};

export const handleCommentDisLike = async (params: any) => {
	try {
		await connectToDb();

		const {userId, commentId, isLiked, isDisliked, path, notMainComment} =
			params;

		let updateQuery = {};

		if (isDisliked) {
			updateQuery = {
				$pull: {
					downvotes: userId,
				},
			};
		} else if (isLiked) {
			updateQuery = {
				$addToSet: {
					downvotes: userId,
				},
				$pull: {
					upvotes: userId,
				},
			};
		} else {
			updateQuery = {
				$addToSet: {
					downvotes: userId,
				},
			};
		}

		await Comment.findByIdAndUpdate(commentId, updateQuery);
		revalidatePath(path);
	} catch (e) {
		console.log(e);
	}
};

export const getMoreComments = async (params: any) => {
	try {
		await connectToDb();

		const {commentId} = params;

		const comment = await Comment.findById(commentId).populate({
			path: "children",
			model: Comment,
			options: {
				populate: {
					path: "author",
					model: User,
				},
			},
		});

		return JSON.parse(JSON.stringify(comment.children));
	} catch (e) {
		console.log(e);
	}
};

export async function addReplyToComment(params: any) {
	try {
		await connectToDb();

		const {commentId, commentText, userId, path} = params;

		const originalComment = await Comment.findById(commentId);

		if (!originalComment) {
			throw new Error(`not found`);
		}

		const commentReply = new Comment({
			text: commentText,
			author: userId,
			parentId: originalComment._id,
		});

		const savedCommentThread = await commentReply.save();

		const returnC = await Comment.findById(savedCommentThread._id).populate({
			path: "author",
			model: User,
		});

		originalComment.children.push(savedCommentThread._id);

		await originalComment.save();

		revalidatePath(path);
		return JSON.parse(JSON.stringify(returnC));
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to add comment`);
	}
}
