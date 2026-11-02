import React from 'react';

/**
 * PixelFringe: 16-bit Pixel Art jagged dither transition border.
 * Default transitions from top grass green (#75A94C) to bottom warm white (#FFFFFF).
 */
export default function PixelFringe({
  color = '#FFFFFF',
  topColor = '#75A94C',
  className = ''
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{ height: '24px' }}
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="w-full h-full block"
      >
        <defs>
          <pattern
            id={`pixelGrassPattern_${color.replace('#', '')}_${topColor.replace('#', '')}`}
            width="48"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="48" height="8" fill={topColor} />
            <rect x="0" y="8" width="6" height="4" fill="#315C3C" />
            <rect x="12" y="8" width="8" height="4" fill="#315C3C" />
            <rect x="26" y="8" width="6" height="4" fill="#315C3C" />
            <rect x="38" y="8" width="10" height="4" fill="#315C3C" />
            <rect x="4" y="8" width="4" height="6" fill={topColor} />
            <rect x="16" y="8" width="6" height="8" fill={topColor} />
            <rect x="28" y="8" width="4" height="7" fill={topColor} />
            <rect x="40" y="8" width="6" height="8" fill={topColor} />
            <rect x="0" y="12" width="4" height="12" fill={color} />
            <rect x="8" y="14" width="8" height="10" fill={color} />
            <rect x="20" y="15" width="8" height="9" fill={color} />
            <rect x="32" y="14" width="8" height="10" fill={color} />
            <rect x="46" y="12" width="2" height="12" fill={color} />
            <rect x="6" y="10" width="2" height="2" fill={color} />
            <rect x="14" y="10" width="2" height="2" fill={color} />
            <rect x="30" y="11" width="2" height="2" fill={color} />
            <rect x="44" y="10" width="2" height="2" fill={color} />
            <rect x="0" y="16" width="48" height="8" fill={color} />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="1200"
          height="24"
          fill={`url(#pixelGrassPattern_${color.replace('#', '')}_${topColor.replace('#', '')})`}
        />
      </svg>
    </div>
  );
}
