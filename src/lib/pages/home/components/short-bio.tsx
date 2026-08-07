import { Grid, Heading ,Blockquote, Float} from '@chakra-ui/react';
import type {ProfileOptions} from '@/data/types';

interface ShortBioProps {
  name: string;
  shortBio: string;
  longBio: string;
  options?: ProfileOptions;
}

export const ShortBio = ({name, longBio, shortBio, options}: ShortBioProps) => {
  //const options = profile.profileOptions[0];
  const colorPalette = options?.colorPalette ?? 'teal';
  return (
  <Grid gap={2} textAlign="center">
    
    <Blockquote.Root variant="plain" colorPalette={colorPalette}>
      <Float placement="top-start" offsetY="2">
        <Blockquote.Icon />
      </Float>
      <Blockquote.Content cite={name}>
        <Heading fontWeight="extrabold" size="md" mb={2}>
          {shortBio}
        </Heading>
        {longBio}
        <Blockquote.Caption mt={2} fontSize="sm" color="gray.500">
        — <cite>{name}</cite>
      </Blockquote.Caption>
      </Blockquote.Content>
        
      
    </Blockquote.Root>
  </Grid>
  )
}
