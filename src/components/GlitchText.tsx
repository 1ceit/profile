import type { FC } from 'react';
import '../styles/GlitchText.css';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  // CSS variables for animation control
  const style = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
  } as React.CSSProperties;

  return (
    <div
      className={`glitch ${enableOnHover ? 'enable-on-hover' : ''} ${className}`}
      style={style}
      data-text={children}
    >
      {children}
    </div>
  );
};

export default GlitchText;
