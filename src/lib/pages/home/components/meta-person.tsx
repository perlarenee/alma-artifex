import { Em, Grid, Text } from '@chakra-ui/react';

import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { SectionHeader } from '@/lib/components/ui/section-header';

interface ShortBioProps {
  jobTitle: string;
  location: string;
  name: string;
  nickname?: string;
  pronouns?: string;
}

export const MetaPerson = ({
  name,
  jobTitle,
  location,
  nickname,
  pronouns,
}: ShortBioProps) => (
  <Grid gap={2} textAlign="center">
    <SectionHeader>{name}</SectionHeader>
    {pronouns ? (
      <Text color="fg.muted" textStyle="sm">
        <Em>{nickname ? `(${nickname} - ${pronouns})` : `(${pronouns})`}</Em>
      </Text>
    ) : null}
    <RevealOnScroll>
      <Text textStyle="sm">{jobTitle}</Text>
    </RevealOnScroll>
    <RevealOnScroll delay="0.2s">
      <Text textStyle="sm">{location}</Text>
    </RevealOnScroll>
  </Grid>
);
