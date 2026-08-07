import { Box, Container } from '@chakra-ui/react';
import { useColorModeValue } from '@/lib/components/ui/color-mode';
import type { PageSectionProps } from '@/data/types';

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
    bgDark ?? bgLight ?? 'transparent',
  );

  return (
    <Box as="section" width="100%" bg={backgroundColor} py={py}>
      <Container maxW={maxW} px={px}>
        <Box display="flex" flexDirection="column" gap={gap}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
