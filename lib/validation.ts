import {z} from "zod";

const emptyStringToUndefined = z.literal("").transform(() => undefined);
const error_message = "Поле не может быть меньше 2 символов";
export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
	return schema.optional().or(emptyStringToUndefined);
}

export const videoUploadSchema = z.object({
	video_title: z.string().min(2).max(150),
	video_description: asOptionalField(
		z.string().min(2, {message: error_message}).max(1250)
	),
	video_category: asOptionalField(
		z.string().min(2, {message: error_message}).max(150)
	),
	tags: asOptionalField(
		z
			.array(z.string().min(1).max(30))
			.min(1, {message: "Минимальное количество Тегов: 1"})
			.max(5, {message: "Максимальное количество Тегов: 5"})
	),
});
export const commentSchema = z.object({
	comment_text: z.string().min(1).max(2550),
});

export const userEditSchema = z.object({
	name: z.string().min(2, {message: error_message}).max(50),
	about: z.string().min(2, {message: error_message}).max(50),
	link: asOptionalField(z.string().min(2, {message: error_message}).max(100)),
});
