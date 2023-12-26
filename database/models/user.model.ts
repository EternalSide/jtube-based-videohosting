import {Schema, models, model, Document} from "mongoose";

export interface IUser extends Document {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	picture: string;
	videos: Schema.Types.ObjectId[];
	savedVideos: Schema.Types.ObjectId[];
	followingIds: Schema.Types.ObjectId[];
	followers: Schema.Types.ObjectId[];
	watchedHistory: Schema.Types.ObjectId[];
	joinedAt: Date;
	background?: string;
	password?: string;
	role?: string;
	link?: string;
	about?: string;
	options: {
		saveHistory: true;
	};
	notifications: Schema.Types.ObjectId[];
	playlists: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
	{
		clerkId: {type: String, required: true},
		name: {type: String, required: true},
		username: {type: String, required: true, unique: true},
		email: {type: String, required: true, unique: true},
		background: {type: String},
		password: {type: String},
		about: {type: String},
		picture: {type: String, required: true},
		link: {type: String},
		videos: [{type: Schema.Types.ObjectId, ref: "Video"}],
		savedVideos: [{type: Schema.Types.ObjectId, ref: "Video"}],
		watchedHistory: [{type: Schema.Types.ObjectId, ref: "Video"}],
		playlists: [{type: Schema.Types.ObjectId, ref: "Playlist"}],
		followingIds: [{type: Schema.Types.ObjectId, ref: "User"}],
		followers: [{type: Schema.Types.ObjectId, ref: "User"}],
		joinedAt: {type: Date, default: Date.now},
		role: {type: String, default: "user"},
		options: {
			saveHistory: {
				type: Boolean,
				default: true,
			},
		},
		notifications: [
			{
				type: Schema.Types.ObjectId,
				ref: "Notification",
			},
		],
	},
	{
		versionKey: false,
	}
);

const User = models?.User || model<IUser>("User", userSchema);

export default User;
