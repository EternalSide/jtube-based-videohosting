"use server";
import Video from "@/database/models/video.model";
import {connectToDb} from "../mongoose";
import User from "@/database/models/user.model";

export const globalSearch = async (searchValue: string) => {
	try {
		await connectToDb();

		const regexQuery = {$regex: searchValue, $options: "i"};

		const results = [];

		const modelAndTypes = [
			{
				model: Video,
				searchField: "video_title",
				type: "Видео",
			},
			{
				model: User,
				searchField: "name",
				type: "Пользователь",
			},
		];

		const generateLink = (fieldName: string, item: any) => {
			switch (fieldName) {
				case "Пользователь":
					return `/${item.username}`;

				case "Видео":
					return `/video/${item._id.toString()}`;

				default:
					return null;
			}
		};

		for (const {model, searchField, type} of modelAndTypes) {
			const queryResults = await model
				.find({[searchField]: regexQuery})
				.limit(4);

			results.push(
				...queryResults.map((item: any) => ({
					title: item[searchField],
					href: generateLink(type, item),
					type,
					picture: item?.picture ? item.picture : "/nouser.jfif",
					videoPreviewUrl: item?.videoPreviewUrl ? item.videoPreviewUrl : null,
				}))
			);
		}

		return JSON.parse(JSON.stringify(results));
	} catch (e) {
		console.log(e);
		throw e;
	}
};
