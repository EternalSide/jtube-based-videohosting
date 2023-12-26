// Выключить свет у видео
import {create} from "zustand";

interface State {
	isOverlayOpen: boolean;
	setOverlayOpen: (action: boolean) => void;
}

export const useOverlay = create<State>((set) => ({
	isOverlayOpen: false,
	setOverlayOpen: (action) => set(() => ({isOverlayOpen: action})),
}));
