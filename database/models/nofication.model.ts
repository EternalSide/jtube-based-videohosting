import {Schema, models, model, Document} from "mongoose";

export interface INotification extends Document {
	type: string;
	user: Schema.Types.ObjectId;
	video: Schema.Types.ObjectId;
	text?: string;
	createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
	{
		type: {type: String},
		user: {type: Schema.Types.ObjectId, ref: "User"},
		video: {type: Schema.Types.ObjectId, ref: "Video"},
		text: {type: String},
		createdAt: {type: Date, default: Date.now},
	},
	{
		versionKey: false,
	}
);

const Notification =
	models?.Notification ||
	model<INotification>("Notification", notificationSchema);

export default Notification;
