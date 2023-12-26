// Этот хук можно использовать, чтобы отслеживать прогресс видоса.
import {ProgressContext} from "@/providers/ProgressProvider";
import {useContext} from "react";

export const useProgress = () => {
	const progress = useContext(ProgressContext);

	if (progress === undefined) {
		throw new Error("Ошибка, не найден ProgressProvider");
	}

	return progress;
};
