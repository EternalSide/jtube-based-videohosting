// Хук для управления модалками
import {create} from "zustand";

type ModalType = "clearHistory" | "auth" | "edit" | "addInPlaylist";

interface State {
	isOpen: boolean;
	setIsOpen: (action: boolean, modal: ModalType, data?: any) => void;
	type: ModalType | null;
	data: any;
}

export const useModal = create<State>((set) => ({
	isOpen: false,
	setIsOpen: (action, modal, data = {}) =>
		set(() => ({isOpen: action, type: modal, data: data})),
	type: null,
	data: {},
}));
