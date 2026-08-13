// src/lib/pages/home/components/photo.tsx

import { Box, Image } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import type { ProfileOptions } from '@/data/types';
import { useColorModeValue } from '@/lib/components/ui/color-mode';

interface PhotoProps {
  name: string;
  options?: ProfileOptions;
  photoUrl: string;
}

const SIZE = 220;
const FONT_SIZE = 14;
const ARC_SPAN = 359; // degrees of the circle the text/border arc covers
const FALLBACK_SRC = '/assets/photo-placeholder.jpg';

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function getArcPath(
  cx: number,
  cy: number,
  r: number,
  span: number,
  bottom = false
) {
  const clampedSpan = Math.min(Math.max(span, 0), 360);
  const halfSpan = clampedSpan / 2;
  const startAngle = bottom ? 180 + halfSpan : 360 - halfSpan;
  const endAngle = bottom ? 180 - halfSpan : halfSpan;
  const p1 = polarToCartesian(cx, cy, r, startAngle);
  const p2 = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = clampedSpan > 180 ? 1 : 0;
  const sweepFlag = bottom ? 0 : 1;

  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${p2.x} ${p2.y}`;
}

export const ImageProfile = ({ photoUrl, options, name }: PhotoProps) => {
  const [imgSrc, setImgSrc] = useState(photoUrl);
  const radius = SIZE / 2;
  const isBottomText = options?.lfwPosition === 'bottom';
  const borderWidth = options?.lookingForWork ? 20 : 0;
  const handleImageError = useCallback(() => {
    setImgSrc(FALLBACK_SRC);
  }, []);
  //const strokeColor = `var(--chakra-colors-${options?.colorPalette ?? 'teal'}-500)`;

  const accentColor = useColorModeValue(
    `var(--chakra-colors-${options?.colorPalette ?? 'teal'}-500)`,
    `var(--chakra-colors-${options?.colorPalette ?? 'teal'}-200)`
  );

  const textPath = getArcPath(
    radius,
    radius,
    radius - borderWidth / 4 - (isBottomText ? 4 : 6),
    ARC_SPAN,
    isBottomText
  );

  return (
    <Box
      height={`${SIZE}px`}
      margin="0 auto"
      position="relative"
      width={`${SIZE}px`}
    >
      <Image
        alt={name}
        borderRadius="full"
        height={`${SIZE}px`}
        left="0"
        objectFit="cover"
        objectPosition="center"
        onError={handleImageError}
        position="absolute"
        src={imgSrc}
        top="0"
        width={`${SIZE}px`}
      />

      {options?.lookingForWork ? (
        <svg
          aria-label="Looking for work"
          height={SIZE}
          role="img"
          style={{ left: 0, position: 'absolute', top: 0 }}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
        >
          <circle
            cx={radius}
            cy={radius}
            fill="none"
            opacity={0.65}
            r={Math.max(0, radius - borderWidth / 2)}
            stroke={accentColor}
            strokeWidth={borderWidth}
          />
          <defs>
            <path d={textPath} fill="none" id="lfwTextPath" />
          </defs>
          <title>Looking for work</title>
          <text
            dominantBaseline="middle"
            fill="white"
            style={{
              fontSize: `${FONT_SIZE}px`,
              fontWeight: 900,
              letterSpacing: '1.5px',
            }}
          >
            <textPath
              href="#lfwTextPath"
              startOffset={options.textOffset ?? '0%'}
              textAnchor="start"
            >
              {options?.lfwText}
            </textPath>
          </text>
        </svg>
      ) : null}
    </Box>
  );
};
