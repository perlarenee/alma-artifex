import { Box, Em, Grid, Heading, List, ListItem, Text } from '@chakra-ui/react';

import type { EducationEntry } from '@/data/types';

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
    <Heading fontWeight="extrabold" mb={2} size="lg">
      Education & Degrees
    </Heading>

    <List.Root gap={3} maxW="container.md" mx="auto">
      {education.map((entry) => (
        <ListItem key={entry.id ?? `${entry.institution}-${entry.degree}`}>
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
        </ListItem>
      ))}
    </List.Root>
  </Grid>
);
