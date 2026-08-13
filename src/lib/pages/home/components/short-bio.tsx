import { Blockquote, Box, Float, Grid, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import type { ProfileOptions } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';

interface ShortBioProps {
  longBio: string;
  name: string;
  options?: ProfileOptions;
  shortBio: string;
}

const renderRichText = (content: string): Array<ReactNode> => {
  if (!content) {
    return [];
  }

  if (typeof DOMParser === 'undefined') {
    return [<Text key="bio-fallback">{content}</Text>];
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(`<div>${content}</div>`, 'text/html');
  const nodes = Array.from(document.body.firstChild?.childNodes ?? []);
  let keyCounter = 0;

  const createKey = (prefix: string, value?: string | null) => {
    const safeValue = (value ?? '').replace(/\s+/g, '-').slice(0, 40) || 'item';
    keyCounter += 1;
    return `${prefix}-${safeValue}-${keyCounter}`;
  };

  return nodes.map((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      return text ? (
        <Text key={createKey('bio-text', text)}>{text}</Text>
      ) : null;
    }

    if (node.nodeName === 'P') {
      const children = Array.from(node.childNodes).map((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          return child.textContent;
        }

        if (child.nodeName === 'STRONG') {
          return (
            <strong key={createKey('bio-strong', child.textContent)}>
              {child.textContent}
            </strong>
          );
        }

        if (child.nodeName === 'EM') {
          return (
            <em key={createKey('bio-em', child.textContent)}>
              {child.textContent}
            </em>
          );
        }

        return child.textContent;
      });

      return (
        <Text as="p" key={createKey('bio-paragraph', node.textContent)} mb={3}>
          {children}
        </Text>
      );
    }

    return null;
  });
};

export const ShortBio = ({
  name,
  longBio,
  shortBio,
  options,
}: ShortBioProps) => {
  const colorPalette = options?.colorPalette ?? 'teal';
  return (
    <Grid gap={2} textAlign="center">
      <RevealOnScroll>
        <Blockquote.Root colorPalette={colorPalette} variant="plain">
          <Float offsetY="2" placement="top-start">
            <Blockquote.Icon />
          </Float>
          <Blockquote.Content cite={name}>
            <Heading fontWeight="extrabold" mb={2} size="md">
              {shortBio}
            </Heading>
            <Box
              color="fg.muted"
              fontSize="sm"
              lineHeight="tall"
              textAlign="left"
            >
              {renderRichText(longBio)}
            </Box>
            <Blockquote.Caption color="gray.500" fontSize="sm" mt={2}>
              — <cite>{name}</cite>
            </Blockquote.Caption>
          </Blockquote.Content>
        </Blockquote.Root>
      </RevealOnScroll>
    </Grid>
  );
};
