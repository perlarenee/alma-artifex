import { Box, Container } from '@chakra-ui/react';

import type { PageSectionProps } from '@/data/types';
import { useColorModeValue } from '@/lib/components/ui/color-mode';

export function PageSection({
  children,
  bgLight,
  bgDark,
  maxW = 'container.sm',
  py = { base: 8, md: 12 },
  px = { base: 4, md: 6 },
  gap = 6,
}: PageSectionProps) {
  const backgroundColor = useColorModeValue(
    bgLight ?? 'transparent',
    bgDark ?? bgLight ?? 'transparent'
  );

  return (
    <Box as="section" bg={backgroundColor} py={py} width="100%">
      <Container maxW={maxW} px={px}>
        <Box display="flex" flexDirection="column" gap={gap}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
