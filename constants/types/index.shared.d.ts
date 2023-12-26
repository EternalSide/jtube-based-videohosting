import {LucideIcon} from "lucide-react";

export type FilterOption = {
	label: string;
	value: string;
};

export interface ChildrenProps {
	children: React.ReactNode;
}

export interface ParamsId {
	params: {
		id: string;
	};
}

export type MenuLink = {
	label: string;
	icon: LucideIcon;
	href: string;
};

export interface MeFilterOption extends MenuLink {
	value: string;
}
