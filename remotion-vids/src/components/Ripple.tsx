import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Ripple: React.FC<{
	delay: number;
	color: string;
	size: number;
}> = ({ delay, color, size }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: {
			damping: 20,
		},
	});

	const opacity = interpolate(progress, [0, 1], [0.6, 0]);
	const scale = interpolate(progress, [0, 1], [0, 4]);

	return (
		<div
			style={{
				position: 'absolute',
				width: size,
				height: size,
				borderRadius: '50%',
				border: `8px solid ${color}`,
				opacity,
				transform: `scale(${scale})`,
			}}
		/>
	);
};
