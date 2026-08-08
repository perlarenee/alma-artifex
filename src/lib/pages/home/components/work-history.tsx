import {
  Accordion,
  Box,
  Card,
  Grid,
  Heading,
  Stack,
  Text,
  Timeline,
} from '@chakra-ui/react';

import type { ProfileOptions, WorkHistoryEntry } from '@/data/types';

interface WorkHistoryProps {
  name: string;
  options: ProfileOptions;
  workHistory: Array<WorkHistoryEntry>;
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Current';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export const WorkHistory = ({ options, workHistory }: WorkHistoryProps) => {
  const accentColor = options.colorPalette;

  const renderEntry = (
    entry: WorkHistoryEntry,
    isMobile = false,
    isAlternating = false
  ) => {
    const dates = `${formatDate(entry.dateStart)} – ${formatDate(entry.dateEnd)}`;
    const leftContentProps = isAlternating
      ? { alignItems: 'flex-end', flex: '1' }
      : { flex: '1' };
    const rightContentProps = isAlternating
      ? { flex: '1', justifyContent: 'flex-end' }
      : { alignItems: 'flex-end', flex: '1' };

    if (isMobile) {
      return (
        <Accordion.Item key={entry.id} value={entry.id}>
          <Accordion.ItemTrigger>
            <Box flex="1" textAlign="left">
              <Text fontWeight="bold">{entry.company}</Text>
              <Text color="fg.muted" fontSize="sm">
                {entry.title} • {dates}
              </Text>
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Stack
              borderRadius="0"
              borderTop="1px solid #ccc"
              gap="2"
              mt="4"
              padding="6"
              textAlign="left"
            >
              <Text fontWeight="bold" textDecoration="underline">
                Responsibilities:
              </Text>
              <Text>{entry.responsibilities}</Text>
              <Text fontWeight="bold" textDecoration="underline">
                Accomplishments:
              </Text>
              <Text> {entry.accomplishments}</Text>
            </Stack>
          </Accordion.ItemContent>
        </Accordion.Item>
      );
    }

    return (
      <Timeline.Item key={entry.id}>
        {isAlternating ? (
          <Timeline.Content flex="1" />
        ) : (
          <Timeline.Content {...leftContentProps}>
            <Card.Root maxW="xl" ml="auto" textAlign="right" textStyle="sm">
              <Card.Body>
                <Card.Title>{entry.company}</Card.Title>
                <Card.Description mb="2">
                  {entry.title} • {dates}
                </Card.Description>
                <Stack gap="2">
                  <Text fontWeight="bold" textDecoration="underline">
                    Responsibilities:
                  </Text>
                  <Text>{entry.responsibilities}</Text>
                  <Text fontWeight="bold" textDecoration="underline">
                    Accomplishments:
                  </Text>
                  <Text> {entry.accomplishments}</Text>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Timeline.Content>
        )}
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator />
        </Timeline.Connector>

        {isAlternating ? (
          <Timeline.Content {...rightContentProps}>
            <Card.Root maxW="xl" textAlign="left" textStyle="sm">
              <Card.Body>
                <Card.Title>{entry.company}</Card.Title>
                <Card.Description mb="2">
                  {entry.title} • {dates}
                </Card.Description>
                <Stack gap="2">
                  <Text fontWeight="bold" textDecoration="underline">
                    Responsibilities:
                  </Text>
                  <Text>{entry.responsibilities}</Text>
                  <Text fontWeight="bold" textDecoration="underline">
                    Accomplishments:
                  </Text>
                  <Text> {entry.accomplishments}</Text>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Timeline.Content>
        ) : (
          <Timeline.Content flex="1" />
        )}
      </Timeline.Item>
    );
  };

  return (
    <Grid gap={6} textAlign="center">
      <Heading fontWeight="extrabold" size="lg">
        WORK HISTORY
      </Heading>

      <Box
        display={{ base: 'block', md: 'none' }}
        maxW="container.sm"
        mx="auto"
        w="full"
      >
        <Accordion.Root
          collapsible
          defaultValue={[workHistory[0]?.id]}
          variant="outline"
        >
          {workHistory.map((entry) => renderEntry(entry, true))}
        </Accordion.Root>
      </Box>

      <Timeline.Root
        colorPalette={accentColor}
        display={{ base: 'none', md: 'block' }}
        maxW="container.md"
        mx="auto"
        size="sm"
        variant="outline"
      >
        {workHistory.map((entry, index) =>
          renderEntry(entry, false, index % 2 === 1)
        )}
      </Timeline.Root>
    </Grid>
  );
};
