import { Grid, Heading} from '@chakra-ui/react';
import type {Profile} from '@/data/types';

interface TestimonialsProps {
  profile: Profile;
}

export const Testimonials = ({profile}: TestimonialsProps) => (
  <Grid gap={2} textAlign="center">
<Heading fontWeight="extrabold" size="lg" mb={2}>
  Testimonials
          {profile.name}
        </Heading>
        testimonials in caurausel with autoplay and navigation buttons, in card format
  </Grid>
)
