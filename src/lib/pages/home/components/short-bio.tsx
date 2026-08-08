import { Blockquote, Float, Grid, Heading } from '@chakra-ui/react';

import type { ProfileOptions } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';

interface ShortBioProps {
  longBio: string;
  name: string;
  options?: ProfileOptions;
  shortBio: string;
}

export const ShortBio = ({
  name,
  longBio,
  shortBio,
  options,
}: ShortBioProps) => {
  //const options = profile.profileOptions[0];
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
            {longBio}
            <Blockquote.Caption color="gray.500" fontSize="sm" mt={2}>
              — <cite>{name}</cite>
            </Blockquote.Caption>
          </Blockquote.Content>
        </Blockquote.Root>
      </RevealOnScroll>
    </Grid>
  );
};
