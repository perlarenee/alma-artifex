import { Grid, Heading} from '@chakra-ui/react';
import type {Profile} from '@/data/types';

interface CredentialsProps {
  profile: Profile;
}

export const Credentials = ({profile}: CredentialsProps) => (
  <Grid gap={2} textAlign="center">
<Heading fontWeight="extrabold" size="lg" mb={2}>
  Credentials
          {profile.name}
        </Heading>
        credentials in grid format centered horizontally
  </Grid>
)
