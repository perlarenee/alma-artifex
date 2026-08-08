import { Box, Flex, Link, Stack } from '@chakra-ui/react';
import { FaBriefcase, FaBullhorn, FaIdCard } from 'react-icons/fa';

import { Button } from '@/lib/components/ui/button';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { ScrollLink } from '@/lib/components/ui/scroll-link';

interface CtaSectionProps {
  colorPalette?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
}

export const CTASection = ({
  colorPalette = 'purple',
  portfolioUrl,
  resumeUrl,
}: CtaSectionProps) => (
  <Box textAlign="center">
    <Flex
      alignItems="center"
      direction="column"
      gap={2}
      justifyContent="center"
      marginY={4}
    >
      <Stack direction={{ base: 'column', md: 'row' }} gap={2}>
        <RevealOnScroll delay="0.4s">
          <Button
            asChild
            colorPalette={colorPalette}
            size="sm"
            variant="outline"
          >
            <ScrollLink
              href="#contactSection"
              offset={24}
              sectionId="contactSection"
            >
              <FaBullhorn />
              Contact Me
            </ScrollLink>
          </Button>
          {portfolioUrl ? (
            <Button
              asChild
              colorPalette={colorPalette}
              size="sm"
              variant="outline"
            >
              <Link
                href={portfolioUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaBriefcase />
                Portfolio
              </Link>
            </Button>
          ) : null}
        </RevealOnScroll>
      </Stack>
      {resumeUrl ? (
        <RevealOnScroll delay="0.5s">
          <Button asChild colorPalette={colorPalette} size="sm" variant="solid">
            <Link href={resumeUrl} rel="noopener noreferrer" target="_blank">
              <FaIdCard /> Download Resume
            </Link>
          </Button>
        </RevealOnScroll>
      ) : null}
    </Flex>
  </Box>
);
