import {Schema, models, model, Document} from "mongoose";

export interface IComment extends Document {
	text: string;
	author: Schema.Types.ObjectId;
	video?: Schema.Types.ObjectId;
	parentId?: string;
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	children: Schema.Types.ObjectId[];
	createdAt: Date;
}

const commentSchema = new Schema<IComment>(
	{
		text: {
			type: String,
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
		parentId: {
			type: String,
		},
		children: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
				default: [],
			},
		],
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		video: {
			type: Schema.Types.ObjectId,
			ref: "Video",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

const Comment = models.Comment || model<IComment>("Comment", commentSchema);

export default Comment;
