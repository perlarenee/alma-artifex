import { Grid, Heading} from '@chakra-ui/react';
import type {Profile} from '@/data/types';

interface VideoSectionProps {
  profile: Profile;
}

export const VideoSection = ({profile}: VideoSectionProps) => (
  <Grid gap={2} textAlign="center">
<Heading fontWeight="extrabold" size="lg" mb={2}>
  Video Section
          {profile.name}
        </Heading>
        youtube video embeeded with styling. Interview question as caption bellow.
  </Grid>
)
