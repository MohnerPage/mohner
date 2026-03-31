import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';
import teasers from './data/teasers.json';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* Main Composition for 130 Teasers */}
			<Composition
				id="TeasersProxy"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920} // Vertical for social media
				defaultProps={{
					titleText: 'Monher Teasers',
					titleColor: '#5c6ac3',
					teasers: teasers,
				}}
			/>
      
      {/* Individual teaser template */}
			<Composition
				id="TeaserTemplate"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
        defaultProps={teasers[0]}
			/>
		</>
	);
};
