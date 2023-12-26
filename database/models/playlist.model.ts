import {Schema, models, model, Document} from "mongoose";

export interface IPlaylist extends Document {
	name: string;
	user: Schema.Types.ObjectId;
	videos: Schema.Types.ObjectId[];
	picture: string;
	description?: string;
	createdAt: Date;
}

const playlistSchema = new Schema<IPlaylist>(
	{
		name: {type: String},
		picture: {type: String},
		user: {type: Schema.Types.ObjectId, ref: "User"},
		videos: [{type: Schema.Types.ObjectId, ref: "Video"}],
		description: {type: String},
		createdAt: {type: Date, default: Date.now},
	},
	{
		versionKey: false,
	}
);

const Playlist =
	models?.Playlist || model<IPlaylist>("Playlist", playlistSchema);

export default Playlist;
