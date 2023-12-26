import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Распарсить url
export const formUrlQuery = ({params, key, value}: any) => {
	const currentUrl = queryString.parse(params);

	currentUrl[key] = value;

	return queryString.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
};

// Дата загрузки видео
export const formatDate = (date: Date) => {
	const months = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];

	const dateObj = new Date(date);

	const day = dateObj.getDate();
	const month = months[dateObj.getMonth()];
	const year = dateObj.getFullYear();

	return `${day} ${month} ${year} г.`;
};

// Время коммента
export function formatRelativeTime(inputDate: any) {
	const currentDate = new Date();
	const targetDate = new Date(inputDate);
	// @ts-ignore
	const timeDifference = currentDate - targetDate;
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds < 60) {
		return "только что";
	} else if (minutes < 60) {
		return `${minutes} ${pluralize(
			minutes,
			"минута",
			"минуты",
			"минут"
		)} назад`;
	} else if (hours < 24) {
		return `${hours} ${pluralize(hours, "час", "часа", "часов")} назад`;
	} else if (days < 30) {
		return `${days} ${pluralize(days, "день", "дня", "дней")} назад`;
	} else if (months < 12) {
		return `${months} ${pluralize(months, "месяц", "месяца", "месяцев")} назад`;
	} else {
		return `${years} ${pluralize(years, "год", "года", "лет")} назад`;
	}
}

//@ts-ignore
const pluralize = (number: number, one, few, many) => {
	if (number % 10 === 1 && number % 100 !== 11) {
		return one;
	} else if (
		number % 10 >= 2 &&
		number % 10 <= 4 &&
		(number % 100 < 10 || number % 100 >= 20)
	) {
		return few;
	} else {
		return many;
	}
};

export const secondsToMinutes = (seconds: any) => {
	var minutes = Math.floor(seconds / 60);

	var remainingSeconds = Math.round(seconds % 60);

	var formattedTime =
		minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

	return formattedTime;
};

// Определяет порядок треков в плейлисте.
export function findAndInspectPlaylistOrder(
	array: any,
	targetKey: string,
	targetValue: string
) {
	// Поиск обьекта по айдишнику видоса.
	const index = array.findIndex((obj: any) => obj[targetKey] === targetValue);

	let before = null;
	let current = null;
	let after = null;

	// Предыдущее видео
	if (index > 0) {
		before = array[index - 1];
	}

	// текущее видео
	if (index >= 0) {
		current = array[index];
	}

	// Следущее видео
	if (index < array.length - 1) {
		after = array[index + 1];
	}

	return {before, current, after};
}

// Процент выполнения в секундах
export const formatVideoTime = (e: any) => {
	const currentTimeInSeconds = e.target.currentTime;
	const minutes = Math.floor(currentTimeInSeconds / 60);
	const seconds = Math.floor(currentTimeInSeconds % 60);
	const formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

	return formattedTime;
};

export const getSecondsFromWidth = (
	e: any,
	ref: any,
	videoDuration: any
): number => {
	const refWidth = ref.current.offsetWidth;
	const clickX = e.clientX - ref.current.getBoundingClientRect().left;
	const progressPercentage = (clickX / refWidth) * 100;
	const seconds = (progressPercentage / 100) * videoDuration;

	return seconds;
};

// Рандом видео для рандомного воспроизведения плейлиста
export const getRandomVideo = (videos: any[], excludedId: string) => {
	const randomValue = Math.floor(Math.random() * videos.length);

	let randVideo: any;

	/** Здесь в идеале написать алгоритм,
	 который будет записывать прошлые видео
     и не воспроизводить их в рандом порядке/
	*/
	for (let i = 0; i <= videos.length; i++) {
		const el = videos[randomValue];
		if (el._id.toString() !== excludedId) {
			return (randVideo = el);
		} else {
			i++;
		}
	}

	return randVideo;
};
