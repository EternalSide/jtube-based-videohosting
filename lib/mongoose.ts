import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
	if (isConnected) return;

	if (!process.env.DATABASE_URL) return console.log("Не найден линк для DB");

	try {
		mongoose.set("strictQuery", true);

		await mongoose.connect(process.env.DATABASE_URL, {dbName: "jtube"});

		return (isConnected = true);
	} catch (e) {
		console.log(e);
	}
};
