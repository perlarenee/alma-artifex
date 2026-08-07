// src/lib/pages/home/components/photo.tsx

import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { useColorModeValue } from '@/lib/components/ui/color-mode';
import type { ProfileOptions } from '@/data/types';

interface PhotoProps {
  photoUrl: string;
  options?: ProfileOptions;
  name: string;
}

const SIZE = 220;
const FONT_SIZE = 14;
const ARC_SPAN = 359; // degrees of the circle the text/border arc covers
const FALLBACK_SRC = '/assets/photo-placeholder.jpg';

// angleDeg: 0 = top, 90 = right, 180 = bottom, 270 = left (clockwise)
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function getArcPath(cx: number, cy: number, r: number, span: number, bottom = false) {
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
    isBottomText,
  );

  return (
    <Box position="relative" width={`${SIZE}px`} height={`${SIZE}px`} margin="0 auto">
      <Image
        src={imgSrc}
        alt={name}
        onError={() => setImgSrc(FALLBACK_SRC)}
        position="absolute"
        top="0"
        left="0"
        width={`${SIZE}px`}
        height={`${SIZE}px`}
        borderRadius="full"
        objectPosition="center"
        objectFit="cover"
      />

      {options?.lookingForWork && (
        <svg
          style={{ position: 'absolute', top: 0, left: 0 }}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <circle
            cx={radius}
            cy={radius}
            r={Math.max(0, radius - borderWidth / 2)}
            fill="none"
            stroke={accentColor}
            strokeWidth={borderWidth}
            opacity={0.65}
          />
          <defs>
            <path id="lfwTextPath" d={textPath} fill="none" />
          </defs>
          <text
            fill="white"
            style={{fontWeight: 900, fontSize: `${FONT_SIZE}px`, letterSpacing: '1.5px' }}
            dominantBaseline="middle"
          >
            <textPath
              href="#lfwTextPath"
              startOffset={options.textOffset ?? "0%"}
              textAnchor="start"
            >
              {options?.lfwText}
            </textPath>
          </text>
        </svg>
      )}
    </Box>
  );
};