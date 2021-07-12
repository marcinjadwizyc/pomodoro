/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import progressStyles from "../enums/progressStyles";
import styles from "../Timer.module.scss";

interface IProgress {
	// Current time of the Timer
	currentTime: number;
	// Total time of the current Timer stage
	totalTime: number;
}

const Progress: React.FC<IProgress> = ({ currentTime, totalTime }) => {
	// State
	const [ progress, setProgress ] = useState(0);

	// Variables
	const radius: number = 125;
	const stroke: number = 4;
	const normalizedRadius: number = radius - stroke * 2;
	const circumference: number = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset: number = circumference - progress / 100 * circumference;

	// Methods
	// Update progress value
	const updateProgress = (): void => {
		const progressValue: number = 100 - currentTime / totalTime * 100;
		const reversedProgress: number = 100 - progressValue;

		setProgress(reversedProgress);
	};

	// Get the time in minutes:seconds format
	const getTime = (): string => {
		const minutes: string = ("0" + Math.floor(currentTime / 60)).slice(-2);
		const seconds: string = ("0" + currentTime % 60).slice(-2);

		return `${minutes}:${seconds}`;
	};

	// Effects
	// Update progress value on every Timer tick
	useEffect(
		() => {
			updateProgress();
		},
		[ currentTime ]
	);

	return (
		<div className={styles.progress}>
			<svg height={radius * 2} width={radius * 2}>
				<circle
					className={styles.circle}
					stroke={progressStyles.stroke}
					fill={progressStyles.fill}
					stroke-width={stroke}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
					strokeDasharray={`${circumference} ${circumference}`}
					style={{ strokeDashoffset }}
					stroke-linecap={progressStyles.linecap}
				/>
			</svg>
			<div className={styles.time}>{getTime()}</div>
		</div>
	);
};

export default Progress;
