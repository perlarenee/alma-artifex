import {
  Accordion,
  Box,
  Card,
  Em,
  Grid,
  List,
  Stack,
  Text,
  Timeline,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

import type {
  ProfileOptions,
  WorkHistoryContentBlock,
  WorkHistoryEntry,
} from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { SectionHeader } from '@/lib/components/ui/section-header';

interface WorkHistoryProps {
  name: string;
  options: ProfileOptions;
  workHistory: Array<WorkHistoryEntry>;
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Current';
  }

  const normalizedValue = value.includes('T') ? value : `${value}T00:00:00`;
  const date = new Date(normalizedValue);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

const createParagraphBlock = (text: string): WorkHistoryContentBlock => ({
  text,
  type: 'paragraph',
});

const paragraphPattern = /^<p[^>]*>([\s\S]*?)<\/p>/i;
const listPattern = /^<ul[^>]*>([\s\S]*?)<\/ul>/i;
const listItemPattern = /<li[^>]*>([\s\S]*?)<\/li>/gi;

const parseHtmlContent = (content: string): Array<WorkHistoryContentBlock> => {
  const blocks: Array<WorkHistoryContentBlock> = [];
  let remaining = content.trim();

  while (remaining) {
    const paragraphMatch = remaining.match(paragraphPattern);
    if (paragraphMatch) {
      const text = paragraphMatch[1].replace(/<[^>]+>/g, '').trim();
      if (text) {
        blocks.push(createParagraphBlock(text));
      }
      remaining = remaining.slice(paragraphMatch[0].length).trim();
      continue;
    }

    const listMatch = remaining.match(listPattern);
    if (listMatch) {
      const items = Array.from(listMatch[1].matchAll(listItemPattern))
        .map((itemMatch) => itemMatch[1].replace(/<[^>]+>/g, '').trim())
        .filter(Boolean);

      if (items.length > 0) {
        blocks.push({ items, type: 'list' });
      }

      remaining = remaining.slice(listMatch[0].length).trim();
      continue;
    }

    const plainText = remaining.replace(/<[^>]+>/g, '').trim();
    if (plainText) {
      blocks.push(createParagraphBlock(plainText));
    }
    break;
  }

  return blocks;
};

export const normalizeWorkHistoryContent = (
  content: string | Array<WorkHistoryContentBlock>
): Array<WorkHistoryContentBlock> => {
  if (Array.isArray(content)) {
    return content;
  }

  if (!content.trim()) {
    return [];
  }

  const parsedBlocks = parseHtmlContent(content);
  if (parsedBlocks.length > 0) {
    return parsedBlocks;
  }

  return [createParagraphBlock(content.replace(/<[^>]+>/g, '').trim())];
};

const renderContentBlocks = (
  content: string | Array<WorkHistoryContentBlock>
): Array<ReactNode> =>
  normalizeWorkHistoryContent(content).map((block) => {
    if (block.type === 'paragraph') {
      return (
        <Text as="p" key={`work-history-paragraph-${block.text}`} mb={2}>
          {block.text}
        </Text>
      );
    }

    return (
      <List.Root
        gap={2}
        key={`work-history-list-${block.items.join('|')}`}
        listStylePosition="outside"
        pl={6}
      >
        {block.items.map((item) => (
          <List.Item color="fg.muted" key={`work-history-list-item-${item}`}>
            {item}
          </List.Item>
        ))}
      </List.Root>
    );
  });

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
                <Em>
                  {entry.title} • {dates}
                </Em>
              </Text>
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Stack
              borderRadius="0"
              borderTop="1px solid #ccc"
              gap="2"
              mb="4"
              mt="4"
              padding="6"
              textAlign="left"
            >
              <Text fontWeight="bold">Responsibilities:</Text>
              <Box mb="2">{renderContentBlocks(entry.responsibilities)}</Box>
              <Text fontWeight="bold">Accomplishments:</Text>
              <Box>{renderContentBlocks(entry.accomplishments)}</Box>
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
            <RevealOnScroll>
              <Card.Root maxW="xl" ml="auto" textAlign="left" textStyle="sm">
                <Card.Body>
                  <Card.Title>{entry.company}</Card.Title>
                  <Card.Description mb="4">
                    <Em>
                      {entry.title} • {dates}
                    </Em>
                  </Card.Description>
                  <Stack gap="2">
                    <Text fontWeight="bold">Responsibilities:</Text>
                    <Box mb="2">
                      {renderContentBlocks(entry.responsibilities)}
                    </Box>
                    <Text fontWeight="bold">Accomplishments:</Text>
                    <Box>{renderContentBlocks(entry.accomplishments)}</Box>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </RevealOnScroll>
          </Timeline.Content>
        )}
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator />
        </Timeline.Connector>

        {isAlternating ? (
          <Timeline.Content {...rightContentProps}>
            <RevealOnScroll offset="120px">
              <Card.Root maxW="xl" textAlign="left" textStyle="sm">
                <Card.Body>
                  <Card.Title>{entry.company}</Card.Title>
                  <Card.Description mb="4">
                    <Em>
                      {entry.title} • {dates}
                    </Em>
                  </Card.Description>
                  <Stack gap="2">
                    <Text fontWeight="bold">Responsibilities:</Text>
                    <Box mb="2">
                      {renderContentBlocks(entry.responsibilities)}
                    </Box>
                    <Text fontWeight="bold">Accomplishments:</Text>
                    <Box>{renderContentBlocks(entry.accomplishments)}</Box>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </RevealOnScroll>
          </Timeline.Content>
        ) : (
          <Timeline.Content flex="1" />
        )}
      </Timeline.Item>
    );
  };

  return (
    <Grid gap={6} textAlign="center">
      <RevealOnScroll>
        <SectionHeader p={4}>WORK HISTORY</SectionHeader>
      </RevealOnScroll>

      <RevealOnScroll>
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
      </RevealOnScroll>

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
