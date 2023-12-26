import {Schema, models, model, Document} from "mongoose";

export interface IVideo extends Document {
	author: Schema.Types.ObjectId;
	video_title: string;
	video_description?: string;
	videoUrl: string;
	videoPreviewUrl: string;
	views: number;
	duration: number;
	video_category: string;
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	comments: Schema.Types.ObjectId[];
	createdAt: Date;
	tags: Schema.Types.ObjectId[];
}

const videoSchema = new Schema<IVideo>(
	{
		video_title: {
			type: String,
			required: true,
		},
		video_category: {
			type: String,
		},
		video_description: {
			type: String,
		},

		videoUrl: {
			type: String,
			required: true,
		},
		videoPreviewUrl: {
			type: String,
			required: true,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
		views: {
			type: Number,
			default: 0,
			required: true,
		},
		upvotes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		downvotes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;
