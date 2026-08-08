import {
  Accordion,
  Box,
  Grid,
  Heading,
  Timeline,
  Text,
  Card,
  Stack
} from '@chakra-ui/react';
import type { ProfileOptions, WorkHistoryEntry } from '@/data/types';

interface WorkHistoryProps {
  name: string;
  options: ProfileOptions;
  workHistory: WorkHistoryEntry[];
}

function formatDate(value: string | null) {
  if (!value) return 'Current';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export const WorkHistory = ({ options, workHistory }: WorkHistoryProps) => {
  const accentColor = options?.colorPalette ?? 'purple';

  const renderEntry = (entry: WorkHistoryEntry, isMobile = false, isAlternating = false) => {
    const dates = `${formatDate(entry.dateStart)} – ${formatDate(entry.dateEnd)}`;
    const leftContentProps = isAlternating
  ? { flex: '1', alignItems: 'flex-end' }
  : { flex: '1' };
  const rightContentProps = isAlternating
  ? { flex: '1', justifyContent: 'flex-end' }
  : { flex: '1', alignItems: 'flex-end'  };

    if (isMobile) {
      return (
        <Accordion.Item key={entry.id} value={entry.id} >
          <Accordion.ItemTrigger>
            <Box flex="1" textAlign="left">
              <Text fontWeight="bold">{entry.company}</Text>
              <Text fontSize="sm" color="fg.muted">
                {entry.title} • {dates}
              </Text>
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent >
            <Stack gap="2" textAlign="left" padding="6" borderTop="1px solid #ccc" borderRadius="0" mt="4">
              <Text fontWeight="bold" textDecoration="underline">Responsibilities:</Text> 
              <Text>{entry.responsibilities}</Text>
              <Text fontWeight="bold" textDecoration="underline">Accomplishments:</Text>
              <Text> {entry.accomplishments}</Text>
            </Stack>
          </Accordion.ItemContent>
        </Accordion.Item>
      );
    }

    return (
      <Timeline.Item key={entry.id}>
        {isAlternating ? (
          <>
            <Timeline.Content flex="1" />
          </>
        ) : (
          <>
            <Timeline.Content {...leftContentProps}>
              <Card.Root maxW="xl" textAlign="right" textStyle="sm" ml="auto">
                <Card.Body>
                  <Card.Title>{entry.company}</Card.Title>
                  <Card.Description mb="2">
                    {entry.title} • {dates}
                  </Card.Description>
                  <Stack gap="2">
                    <Text fontWeight="bold" textDecoration="underline">Responsibilities:</Text> 
                    <Text>{entry.responsibilities}</Text>
                    <Text fontWeight="bold" textDecoration="underline">Accomplishments:</Text>
                    <Text> {entry.accomplishments}</Text>
                    </Stack>
                </Card.Body>
              </Card.Root>
            </Timeline.Content>
            </>
        )}
            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator/>
            </Timeline.Connector>
            
            {isAlternating ? (
          <>
            <Timeline.Content  {...rightContentProps}>
              <Card.Root maxW="xl" textAlign="left" textStyle="sm">
                <Card.Body>
                  <Card.Title>{entry.company}</Card.Title>
                  <Card.Description mb="2">
                    {entry.title} • {dates}
                  </Card.Description>
                  <Stack gap="2">
                    <Text fontWeight="bold" textDecoration="underline">Responsibilities:</Text> 
                    <Text>{entry.responsibilities}</Text>
                    <Text fontWeight="bold" textDecoration="underline">Accomplishments:</Text>
                    <Text> {entry.accomplishments}</Text>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Timeline.Content>
          </>
        ) : (
          <>
            <Timeline.Content flex="1" />
          </>
        )}


      </Timeline.Item>
    );
  };

  return (
    <Grid gap={6} textAlign="center">
      <Heading fontWeight="extrabold" size="lg">
        WORK HISTORY
      </Heading>

      <Box display={{ base: 'block', md: 'none' }} maxW="container.sm" mx="auto" w="full">
        <Accordion.Root collapsible defaultValue={[workHistory[0]?.id]} variant="outline">
          {workHistory.map((entry) => renderEntry(entry, true))}
        </Accordion.Root>
      </Box>

      <Timeline.Root
        size="sm"
        colorPalette={accentColor}
        maxW="container.md"
        mx="auto"
        display={{ base: 'none', md: 'block' }}
        variant="outline"
      >
        {workHistory.map((entry, index) => renderEntry(entry, false, index % 2 === 1))}
      </Timeline.Root>
    </Grid>
  );
};
