import { registerRoot, Composition } from 'remotion';
import EpisodioTeaser from './EpisodioTeaser';
import './styles.css';

const RemotionRoot = () => {
  return (
    <Composition
      id="EpisodioTeaser"
      component={EpisodioTeaser}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
