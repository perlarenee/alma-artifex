import { Grid, Heading ,Blockquote, Float} from '@chakra-ui/react';
import type {Profile} from '@/data/types';

interface ShortBioProps {
  profile: Profile;
}

export const ShortBio = ({profile}: ShortBioProps) => (
  <Grid gap={2} textAlign="center">
    
    <Blockquote.Root variant="plain" colorPalette="teal">
      <Float placement="top-start" offsetY="2">
        <Blockquote.Icon />
      </Float>
      <Blockquote.Content cite={profile.name}>
        <Heading fontWeight="extrabold" size="md" mb={2}>
          {profile.shortBio}
        </Heading>
        {profile.longBio}
        <Blockquote.Caption mt={2} fontSize="sm" color="gray.500">
        — <cite>{profile.name}</cite>
      </Blockquote.Caption>
      </Blockquote.Content>
        
      
    </Blockquote.Root>
  </Grid>
)
