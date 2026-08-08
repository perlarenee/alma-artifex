import { Box, Em, Grid, List, ListItem, Text } from '@chakra-ui/react';

import type { EducationEntry } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { SectionHeader } from '@/lib/components/ui/section-header';

interface EducationProps {
  education: Array<EducationEntry>;
}

const formatDate = (value: string | null) => {
  if (!value) {
    return 'Present';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const Education = ({ education }: EducationProps) => (
  <Grid gap={4} textAlign="center">
    <RevealOnScroll>
      <SectionHeader p={4}>EDUCATION & DEGREES</SectionHeader>
    </RevealOnScroll>

    <List.Root gap={3} maxW="container.md" mx="auto">
      {education.map((entry) => (
        <ListItem key={entry.id ?? `${entry.institution}-${entry.degree}`}>
          <RevealOnScroll>
            <Box textAlign="left">
              <Text fontWeight="bold">{entry.degree}</Text>
              <Text color="fg.muted" fontSize="sm">
                <Em>
                  {entry.institution} - {entry.fieldOfStudy}
                </Em>
              </Text>
              <Text color="fg.muted" fontSize="sm">
                {formatDate(entry.dateStart)} – {formatDate(entry.dateEnd)}
              </Text>
            </Box>
          </RevealOnScroll>
        </ListItem>
      ))}
    </List.Root>
  </Grid>
);
