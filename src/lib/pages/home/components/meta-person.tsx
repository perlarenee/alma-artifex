import { Grid, Heading, Text } from '@chakra-ui/react';

interface ShortBioProps {
  jobTitle: string;
  location: string;
  name: string;
}

export const MetaPerson = ({ name, jobTitle, location }: ShortBioProps) => (
  <Grid gap={2} textAlign="center">
    <Heading fontWeight="extrabold" size="2xl">
      {name}
    </Heading>
    <Text textStyle="sm">
      {jobTitle} | {location}
    </Text>
  </Grid>
);
