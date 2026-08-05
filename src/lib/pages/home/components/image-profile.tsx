// src/lib/pages/home/components/photo.tsx

import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import type { Profile } from '@/data/types';

interface PhotoProps {
  profile: Profile;
}

const SIZE = 220;
const BORDER_WIDTH = 28;
const FONT_SIZE = 14;
const ARC_SPAN = 200; // degrees of the circle the text/border arc covers
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

export const ImageProfile = ({ profile }: PhotoProps) => {
  const [imgSrc, setImgSrc] = useState(profile.photoUrl);

  const options = profile.profileOptions[0];
  const radius = SIZE / 2;
  const textPadding = options.lfwPosition === "bottom" ? 6 : 8;

  const textPath = getArcPath(
    radius,
    radius,
    radius - BORDER_WIDTH / 4 -textPadding,
    ARC_SPAN,
    options?.lfwPosition === 'bottom',
  );

  return (
    <Box position="relative" width={`${SIZE}px`} height={`${SIZE}px`} margin="0 auto">
      <Image
        src={imgSrc}
        alt={profile.name}
        onError={() => setImgSrc(FALLBACK_SRC)}
        position="absolute"
        top="0"
        left="0"
        width={`${SIZE}px`}
        height={`${SIZE}px`}
        borderRadius="full"
        boxSizing="border-box"
        border={`${BORDER_WIDTH}px solid var(--chakra-colors-${options?.colorPalette ?? 'teal'}-500)`}
        objectFit="cover"
      />

      {options?.lookingForWork && (
        <svg
          style={{ position: 'absolute', top: 0, left: 0 }}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
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