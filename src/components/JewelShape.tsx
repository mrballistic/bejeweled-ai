import { JewelKind } from '../types/game';

interface JewelShapeProps {
  type: JewelKind;
  size: number;
}

const JEWEL_COLORS: Record<JewelKind, string> = {
  diamond: '#60C8FF',
  ruby: '#FF4060',
  emerald: '#40E880',
  sapphire: '#4060FF',
  topaz: '#FFD040',
  amethyst: '#C060FF',
  citrine: '#FF8040',
};

const JEWEL_HIGHLIGHT: Record<JewelKind, string> = {
  diamond: '#B0E8FF',
  ruby: '#FF90A0',
  emerald: '#90FFB8',
  sapphire: '#90A0FF',
  topaz: '#FFE890',
  amethyst: '#E0A0FF',
  citrine: '#FFB080',
};

function Diamond({ size, color, highlight, id }: ShapeProps) {
  const half = size / 2;
  const inset = size * 0.18;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <rect
        x={inset}
        y={inset}
        width={size - inset * 2}
        height={size - inset * 2}
        rx={2}
        fill={`url(#grad-${id})`}
        transform={`rotate(45 ${half} ${half})`}
      />
    </svg>
  );
}

function Ruby({ size, color, highlight, id }: ShapeProps) {
  const half = size / 2;
  const r = size * 0.36;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <circle cx={half} cy={half} r={r} fill={`url(#grad-${id})`} />
    </svg>
  );
}

function Emerald({ size, color, highlight, id }: ShapeProps) {
  const half = size / 2;
  const r = size * 0.36;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${half + r * Math.cos(angle)},${half + r * Math.sin(angle)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <polygon points={points} fill={`url(#grad-${id})`} />
    </svg>
  );
}

function Sapphire({ size, color, highlight, id }: ShapeProps) {
  const inset = size * 0.16;
  const w = size - inset * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <rect x={inset} y={inset} width={w} height={w} rx={w * 0.25} fill={`url(#grad-${id})`} />
    </svg>
  );
}

function Topaz({ size, color, highlight, id }: ShapeProps) {
  const half = size / 2;
  const r = size * 0.38;
  const points = Array.from({ length: 3 }, (_, i) => {
    const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
    return `${half + r * Math.cos(angle)},${half + r * Math.sin(angle)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <polygon points={points} fill={`url(#grad-${id})`} />
    </svg>
  );
}

function Amethyst({ size, color, highlight, id }: ShapeProps) {
  const half = size / 2;
  const outer = size * 0.38;
  const inner = size * 0.15;
  const points = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    return `${half + r * Math.cos(angle)},${half + r * Math.sin(angle)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <polygon points={points} fill={`url(#grad-${id})`} />
    </svg>
  );
}

function Citrine({ size, color, highlight, id }: ShapeProps) {
  const half = size / 2;
  const rx = size * 0.32;
  const ry = size * 0.24;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`grad-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <ellipse cx={half} cy={half} rx={rx} ry={ry} fill={`url(#grad-${id})`} />
    </svg>
  );
}

interface ShapeProps {
  size: number;
  color: string;
  highlight: string;
  id: string;
}

const SHAPE_COMPONENTS: Record<JewelKind, React.FC<ShapeProps>> = {
  diamond: Diamond,
  ruby: Ruby,
  emerald: Emerald,
  sapphire: Sapphire,
  topaz: Topaz,
  amethyst: Amethyst,
  citrine: Citrine,
};

const JewelShape: React.FC<JewelShapeProps> = ({ type, size }) => {
  const ShapeComponent = SHAPE_COMPONENTS[type];
  return (
    <ShapeComponent
      size={size}
      color={JEWEL_COLORS[type]}
      highlight={JEWEL_HIGHLIGHT[type]}
      id={type}
    />
  );
};

export default JewelShape;
