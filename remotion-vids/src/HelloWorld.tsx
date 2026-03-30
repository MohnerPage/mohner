import React, { useEffect } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { Ripple } from './components/Ripple';
import { Highlight } from './components/Highlight';

export const HelloWorld: React.FC<{
	title: string;
	color: string;
	price: string;
}> = ({ title, color, price }) => {
	const frame = useCurrentFrame();
	const { width, height, fps } = useVideoConfig();

	const entryProgress = spring({
		frame,
		fps,
		config: { damping: 20 },
	});

	const titleOpacity = interpolate(entryProgress, [0, 1], [0, 1]);
	const translateTitle = interpolate(entryProgress, [0, 1], [100, 0]);

	return (
		<AbsoluteFill style={{ backgroundColor: '#0a0a0a', color: 'white' }}>
			{/* Background Ripples */}
			<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Ripple delay={0} color={color} size={400} />
				<Ripple delay={15} color={color} size={400} />
				<Ripple delay={30} color={color} size={400} />
			</AbsoluteFill>

			{/* Main Title Content */}
			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: 80,
					zIndex: 10,
				}}
			>
				<div style={{ position: 'relative' }}>
					<Highlight width={600} height={120} color={color} delay={10} />
					<h1
						style={{
							fontFamily: 'Pirulen, sans-serif',
							fontSize: 80,
							margin: 0,
							opacity: titleOpacity,
							transform: `translateY(${translateTitle}px)`,
							position: 'relative',
							zIndex: 1,
						}}
					>
						{title}
					</h1>
				</div>

				<div
					style={{
						marginTop: 40,
						fontSize: 60,
						fontFamily: 'Inter, sans-serif',
						opacity: titleOpacity,
					}}
				>
					Desde <span style={{ color, fontWeight: 'bold' }}>${price}</span>
				</div>
			</div>

			{/* Industrial accent line */}
			<div
				style={{
					position: 'absolute',
					bottom: 100,
					left: 80,
					width: 100,
					height: 10,
					backgroundColor: color,
				}}
			/>
		</AbsoluteFill>
	);
};
