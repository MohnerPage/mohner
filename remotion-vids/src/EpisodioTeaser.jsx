import React from 'react';
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig, 
  Sequence
} from 'remotion';

const UNIVA_BLUE = '#003366';
const UNIVA_YELLOW = '#FFCC00';

const RippleCircle = ({ delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20 },
  });
  const opacity = interpolate(progress, [0, 1], [0.8, 0]);
  const scale = interpolate(progress, [0, 1], [0, 5]);

  return (
    <div
      style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `10px solid ${color}`,
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};

const HighlightRect = ({ delay, color, width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100 },
  });
  const currentWidth = interpolate(progress, [0, 1], [0, width]);

  return (
    <div
      style={{
        position: 'absolute',
        width: currentWidth,
        height,
        backgroundColor: color,
        opacity: 0.3,
      }}
    />
  );
};

const EpisodioTeaser = ({ temporada, episodio, titulo, hook, ubicacion }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', color: 'white', fontFamily: 'Pirulen' }}>
      {/* Background Ripples (Constant) */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <RippleCircle delay={0} color={UNIVA_BLUE} />
        <RippleCircle delay={50} color={UNIVA_YELLOW} />
        <RippleCircle delay={100} color={UNIVA_BLUE} />
      </AbsoluteFill>

      {/* Part 1: Season & Episode Badge */}
      <Sequence from={0} durationInFrames={45}>
        <ContentWrapper>
           <Badge temporada={temporada} episodio={episodio} />
        </ContentWrapper>
      </Sequence>

      {/* Part 2: Main Title Focus */}
      <Sequence from={45} durationInFrames={60}>
        <ContentWrapper>
           <Title titulo={titulo} color={UNIVA_BLUE} width={width} />
        </ContentWrapper>
      </Sequence>

      {/* Part 3: Hook & Location Conclusion */}
      <Sequence from={105} durationInFrames={45}>
        <ContentWrapper>
           <Conclusion hook={hook} ubicacion={ubicacion} />
        </ContentWrapper>
      </Sequence>
    </AbsoluteFill>
  );
};

// Helper Components for Clean Animations
const ContentWrapper = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0]
  );
  
  const scale = interpolate(
    frame,
    [0, 10],
    [0.9, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ 
      justifyContent: 'center', 
      padding: 100, 
      opacity, 
      transform: `scale(${scale})` 
    }}>
      {children}
    </AbsoluteFill>
  );
};

const Badge = ({ temporada, episodio }) => (
  <div style={{ display: 'flex', gap: 20, fontSize: 60, color: UNIVA_YELLOW, justifyContent: 'center' }}>
    <span>{temporada}</span>
    <span style={{ color: 'white' }}>|</span>
    <span>{episodio}</span>
  </div>
);

const Title = ({ titulo, color, width }) => (
  <div style={{ position: 'relative', textAlign: 'center' }}>
    <HighlightRect delay={0} color={color} width={width * 0.8} height={140} />
    <h1 style={{ fontSize: 100, margin: 0, position: 'relative', zIndex: 1 }}>
      {titulo}
    </h1>
  </div>
);

const Conclusion = ({ hook, ubicacion }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 50, fontStyle: 'italic', borderLeft: `12px solid ${UNIVA_YELLOW}`, paddingLeft: 40, textAlign: 'left', display: 'inline-block' }}>
      “{hook}”
    </div>
    <div style={{ marginTop: 80, fontSize: 30, color: '#aaa' }}>
      📍 {ubicacion}
    </div>
  </div>
);

EpisodioTeaser.defaultProps = {
  temporada: 'Temporada 1',
  episodio: 'S01E01',
  titulo: 'El pozo que secó',
  hook: '¿Tu colonia sin agua desde hace semanas?',
  ubicacion: 'Colonia Agua Blanca, El Salto',
};

export default EpisodioTeaser;
