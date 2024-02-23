import React from "react";

interface Props<T> {
	containerRef: React.RefObject<T>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dependencies: any[];
	functionInCondition?: (...args: any[]) => any;
	functionAfterCondition?: (...args: any[]) => any;
}

export default function useOutSideClick<T>({
	containerRef,
	setIsOpen,
	dependencies,
	functionInCondition,
	functionAfterCondition,
}: Props<T>) {
	if (!Array.isArray(dependencies)) {
		throw new Error("dependencies должен быть массивом.");
	}

	React.useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (!containerRef?.current) return;
			if (
				containerRef?.current instanceof Element &&
				!containerRef?.current.contains(e.target as Node)
			) {
				setIsOpen(false);
				if (functionInCondition) {
					functionInCondition();
				}
			}
		};
		if (functionAfterCondition) {
			functionAfterCondition();
		}
		document.addEventListener("click", handleOutsideClick);

		return () => document.removeEventListener("click", handleOutsideClick);
	}, dependencies);
}
