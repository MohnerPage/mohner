import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Highlight: React.FC<{
	width: number;
	height: number;
	color: string;
	delay: number;
}> = ({ width, height, color, delay }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: {
			stiffness: 100,
		},
	});

	const currentWidth = interpolate(progress, [0, 1], [0, width]);

	return (
		<div
			style={{
				position: 'absolute',
				width: currentWidth,
				height,
				backgroundColor: color,
				borderRadius: 4,
				opacity: 0.4,
			}}
		/>
	);
};
