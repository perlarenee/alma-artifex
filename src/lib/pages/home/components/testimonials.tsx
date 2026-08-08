import {
  Avatar,
  Box,
  Card,
  Grid,
  Heading,
  HStack,
  Marquee,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoStar } from 'react-icons/io5';

import type { Testimonials } from '@/data/types';

interface TestimonialsProps {
  testimonials: Array<Testimonials>;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonials }) => (
  <Card.Root h="full" maxW="sm">
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
          “{testimonial.quote}”
        </Card.Description>

        <HStack gap="3" mt="1">
          <Avatar.Root size="sm">
            {testimonial.avatarUrl ? (
              <Avatar.Image src={testimonial.avatarUrl} />
            ) : null}
            <Avatar.Fallback name={testimonial.name} />
          </Avatar.Root>
          <Box textStyle="sm">
            <Box color="fg" fontWeight="medium">
              {testimonial.name}
            </Box>
            {testimonial.role ? (
              <Box color="fg.muted">{testimonial.role}</Box>
            ) : null}
            {testimonial.title ? (
              <Box color="fg.muted">{testimonial.title}</Box>
            ) : null}
          </Box>
        </HStack>
      </Stack>
    </Card.Body>
  </Card.Root>
);

export const TestimonialMarquee = ({ testimonials }: TestimonialsProps) => (
  <Grid gap={4} textAlign="center">
    <Heading fontWeight="extrabold" mb={2} size="lg">
      Testimonials
    </Heading>

    {testimonials.length > 0 ? (
      <Marquee.Root pauseOnInteraction py="10">
        <Box
          _dark={{
            bg: 'linear-gradient(90deg, var(--chakra-colors-gray-800) 0%, transparent 100%)',
          }}
          _light={{
            bg: 'linear-gradient(90deg, var(--chakra-colors-white) 0%, transparent 100%)',
          }}
          bg="linear-gradient(90deg, var(--chakra-colors-gray-800) 0%, transparent 100%)"
          insetY="0"
          left="0"
          pointerEvents="none"
          position="absolute"
          w="8rem"
          zIndex="1"
        />
        <Box
          _dark={{
            bg: 'linear-gradient(270deg, var(--chakra-colors-gray-800) 0%, transparent 100%)',
          }}
          _light={{
            bg: 'linear-gradient(270deg, var(--chakra-colors-white) 0%, transparent 100%)',
          }}
          bg="linear-gradient(270deg, var(--chakra-colors-gray-800) 0%, transparent 100%)"
          insetY="0"
          pointerEvents="none"
          position="absolute"
          right="0"
          w="8rem"
          zIndex="1"
        />
        <Marquee.Viewport>
          <Marquee.Content>
            {testimonials.map((testimonial) => (
              <Marquee.Item key={testimonial.id} px="1rem">
                <TestimonialCard testimonial={testimonial} />
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    ) : (
      <Text color="fg.muted">No testimonials yet.</Text>
    )}
  </Grid>
);
