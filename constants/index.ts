import {FilterOption, MeFilterOption, MenuLink} from "./types/index.shared";
import {
	Bookmark,
	History,
	UserCheck,
	Home,
	Rocket,
	MonitorPlay,
	BookMarked,
	Tv,
	Clock,
	Sparkle,
	ListVideo,
} from "lucide-react";

export const videosFilterOptions: FilterOption[] = [
	{
		label: "Новые",
		value: "new",
	},
	{
		label: "Популярные",
		value: "popular",
	},
	{
		label: "Старые",
		value: "old",
	},
];

export const mePageFilterOptions: MeFilterOption[] = [
	{
		label: "Смотреть позже",
		value: "watchlater",
		href: "/me",
		icon: Bookmark,
	},
	{
		label: "Подписки",
		value: "subcriptions",
		href: "/me/subcriptions",
		icon: UserCheck,
	},
	{
		label: "История просмотра",
		value: "history",
		href: "/me/history",
		icon: History,
	},
];

export const menuLinks: MenuLink[] = [
	{
		label: "Главная",
		icon: Home,
		href: "/",
	},
	{
		label: "Мой канал",
		icon: Tv,
		href: "/fakevalue",
	},
	{
		label: "Плейлисты",
		icon: ListVideo,
		href: "/playlists",
	},
	{
		label: "Новые",
		icon: Sparkle,
		href: "/new",
	},
	{
		label: "В топе",
		icon: Rocket,
		href: "/top",
	},
	{
		label: "Подписки",
		icon: MonitorPlay,
		href: "/me/subcriptions",
	},
	{
		label: "Смотреть позже",
		icon: Clock,
		href: "/me",
	},
	{
		label: "История",
		icon: BookMarked,
		href: "/me/history",
	},
];

export const videoCategories = [
	{label: "Авто"},
	{label: "Блогеры"},
	{label: "Видеоигры"},
	{label: "Детям"},
	{label: "Детям Бета"},
	{label: "Еда"},
	{label: "Интервью"},
	{label: "Культура"},
	{label: "Лайфхаки"},
	{label: "Музыка"},
	{label: "Новости и СМИ"},
	{label: "Обучение"},
	{label: "Подкасты"},
	{label: "Путешествия"},
	{label: "Радио"},
	{label: "Сериалы"},
	{label: "Спорт"},
	{label: "ТВ онлайн"},
	{label: "Телеканалы"},
	{label: "Телешоу"},
	{label: "Трансляции"},
	{label: "Фонды помощи"},
	{label: "Юмор"},
];
