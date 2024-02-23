"use client";
import {StepBack, StepForward} from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import {usePlayer} from "@/hooks/usePlayer";
import {ChildrenProps} from "@/constants/types/index.shared";

const ChangeTime = ({children}: ChildrenProps) => {
	const {handleChangeTime} = usePlayer();
	return (
		<>
			<ActionTooltip
				classNames='mb-2'
				align='center'
				label='Назад на 15 сек'
			>
				<button onClick={() => handleChangeTime("back")}>
					<StepBack
						fill='white'
						className='player__icon'
					/>
				</button>
			</ActionTooltip>
			{children}
			<ActionTooltip
				classNames='mb-2'
				align='center'
				label='Вперед на 15 сек'
			>
				<button onClick={() => handleChangeTime("forward")}>
					<StepForward
						fill='white'
						className='player__icon'
					/>
				</button>
			</ActionTooltip>
		</>
	);
};
export default ChangeTime;
