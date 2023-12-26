import {Schema, models, model, Document} from "mongoose";

export interface ICategory extends Document {
	name: string;
	videos: Schema.Types.ObjectId[];
	createdAt: Date;
	info?: string;
	description?: string;
	picture?: string;
	background?: string;
}

const categorySchema = new Schema<ICategory>(
	{
		name: {type: String, required: true},
		picture: {type: String, required: true},
		videos: [{type: Schema.Types.ObjectId, ref: "Video", default: []}],
		createdAt: {type: Date, default: Date.now},
	},
	{
		versionKey: false,
	}
);

const Category = models?.Category || model<ICategory>("Category", categorySchema);

export default Category;
