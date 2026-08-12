import {
  Avatar,
  Box,
  Card,
  Carousel,
  Grid,
  HStack,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { IoStar } from 'react-icons/io5';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import type { Testimonials } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { SectionHeader } from '@/lib/components/ui/section-header';

interface TestimonialsProps {
  testimonials: Array<Testimonials>;
}

const paragraphSeparatorPattern = /\n\s*\n/;

const formatQuoteParagraphs = (quote: string): Array<string> => {
  const normalized = quote.replace(/\r\n/g, '\n').trim();
  if (!normalized) {
    return [];
  }

  const htmlParagraphs = normalized.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  if (htmlParagraphs?.length) {
    return htmlParagraphs
      .map((paragraph) =>
        paragraph
          .replace(/<p[^>]*>/gi, '')
          .replace(/<\/p>/gi, '')
          .replace(/<br\s*\/?>/gi, '\n')
          .trim()
      )
      .filter(Boolean);
  }

  return normalized
    .split(paragraphSeparatorPattern)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonials }) => {
  const quoteParagraphs = formatQuoteParagraphs(testimonial.quote);

  return (
    <Card.Root h="full" w="full">
      <Card.Body>
        <Stack gap="3">
          <HStack gap="1">
            <Box as={IoStar} color="orange.solid" />
            <Box as={IoStar} color="orange.solid" />
            <Box as={IoStar} color="orange.solid" />
            <Box as={IoStar} color="orange.solid" />
            <Box as={IoStar} color="orange.solid" />
          </HStack>

          <Card.Description color="fg.muted" minH="16" textStyle="md">
            {quoteParagraphs.map((paragraph) => (
              <Text
                as="span"
                display="block"
                key={`${testimonial.id}-quote-${paragraph}`}
                mb={2}
              >
                {paragraph}
              </Text>
            ))}
          </Card.Description>

          <HStack alignItems="flex-start" gap="3" mt="1">
            <Avatar.Root size="sm">
              {testimonial.avatarUrl ? (
                <Avatar.Image src={testimonial.avatarUrl} />
              ) : null}
              <Avatar.Fallback name={testimonial.name} />
            </Avatar.Root>
            <Box textStyle="sm">
              <Box color="fg" fontWeight="medium">
                {testimonial.name}{' '}
                {testimonial.title ? ` — ${testimonial.title}` : null}
              </Box>

              <Box color="fg.muted">
                {testimonial.company ? testimonial.company : null}
              </Box>
            </Box>
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export const TestimonialMarquee = ({ testimonials }: TestimonialsProps) => {
  const slidesPerPage = useBreakpointValue({ base: 1, md: 1.5 }) ?? 1.5;

  return (
    <Grid gap={4} textAlign="center">
      <RevealOnScroll>
        <SectionHeader p={3}>TESTIMONIALS</SectionHeader>
      </RevealOnScroll>

      {testimonials.length > 0 ? (
        <Box overflow="hidden" position="relative" py={3}>
          <Carousel.Root
            allowMouseDrag
            autoplay={{ delay: 5000 }}
            loop
            slideCount={testimonials.length}
            slidesPerPage={slidesPerPage}
          >
            <Carousel.ItemGroup>
              {testimonials.map((testimonial, index) => (
                <Carousel.Item index={index} key={testimonial.id}>
                  <Box h="full" px={{ base: '0.25rem', md: '0.5rem' }}>
                    <TestimonialCard testimonial={testimonial} />
                  </Box>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <Carousel.Control gap="4" justifyContent="center">
              <Carousel.PrevTrigger
                aria-label="Show previous testimonials"
                asChild
              >
                <IconButton size="xs" variant="ghost">
                  <LuChevronLeft />
                </IconButton>
              </Carousel.PrevTrigger>

              <Carousel.Indicators />

              <Carousel.NextTrigger aria-label="Show next testimonials" asChild>
                <IconButton size="xs" variant="ghost">
                  <LuChevronRight />
                </IconButton>
              </Carousel.NextTrigger>
            </Carousel.Control>
          </Carousel.Root>
        </Box>
      ) : (
        <Text color="fg.muted">No testimonials yet.</Text>
      )}
    </Grid>
  );
};
