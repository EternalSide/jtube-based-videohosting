// Управление миниплеером снизу
import {create} from "zustand";

interface State {
	isOpen: boolean;
	isMounted: boolean;
	setIsOpen: (action: boolean, data?: any, mounted?: boolean) => void;
	setIsMounted: (action: boolean, data?: any, mounted?: boolean) => void;
	data: any;
}

export const useVideoBottom = create<State>((set) => ({
	isOpen: false,
	setIsMounted: (action) => set(() => ({isMounted: action})),
	isMounted: false,
	setIsOpen: (action, data = {}, mounted) =>
		set(() => ({isOpen: action, data: data, isMounted: mounted})),
	data: {},
}));
