// Выдвижной Сайдбар Слева
import {create} from "zustand";

interface State {
	isOpen: boolean;
	setIsOpen: (action: boolean) => void;
}

export const useSheetSidebar = create<State>((set) => ({
	isOpen: false,
	setIsOpen: (action) => set(() => ({isOpen: action})),
}));
