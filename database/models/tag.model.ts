import {Schema, models, model, Document} from "mongoose";

export interface ITag extends Document {
	name: string;
	videos: Schema.Types.ObjectId[];
	createdAt: Date;
}

const TagSchema = new Schema<ITag>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		videos: [
			{
				type: Schema.Types.ObjectId,
				ref: "Video",
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

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
