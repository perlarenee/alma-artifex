import { Grid, Heading, Text } from '@chakra-ui/react';
import type {Profile} from '@/data/types';

interface ShortBioProps {
  profile: Profile;
}

export const MetaPerson = ({profile}: ShortBioProps) => (
  <Grid gap={2} textAlign="center">
    <Heading fontWeight="extrabold" size="2xl">
      {profile.name}
    </Heading>
    <Text textStyle="sm">
      {profile.jobTitle} | {profile.location} 
    </Text>
  </Grid>
)
