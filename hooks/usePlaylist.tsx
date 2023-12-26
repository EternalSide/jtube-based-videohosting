/** Плейлист можно открыть
1. через URL
2. карточка видео в Плейлисте
3. кнопка воспроизвести все
Хук контролирует плейлист и его порядок воспроизведения через любой метод.
Автовоспроизведение включено по дефолту на следующий видос.
 */
import {create} from "zustand";

type PlayListType = {
	isPlayListMode: boolean;
	playlistName: string | null;
	playlistId: string | null;
	currentPlaying: string | null;
	prevVideo: string | null;
	nextVideo: string | null;
	videos: any[] | null;
	randomOrder: boolean;
};

interface State {
	playlist: PlayListType;
	setPlaylistData: (playlistData: Partial<PlayListType>) => void;
}

export const usePlaylist = create<State>((set) => ({
	playlist: {
		isPlayListMode: false,
		playlistName: null,
		playlistId: null,
		currentPlaying: null,
		prevVideo: null,
		nextVideo: null,
		videos: null,
		randomOrder: false,
	},
	setPlaylistData: (playlistData: Partial<PlayListType>) =>
		set((state) => ({playlist: {...state.playlist, ...playlistData}})),
}));
