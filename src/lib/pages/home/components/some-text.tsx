import { Grid, Heading, Text } from '@chakra-ui/react';

export const SomeText = () => (
  <Grid gap={2} textAlign="center">
    <Heading fontWeight="extrabold" size="2xl">
      [NAME]
    </Heading>
    <Text textStyle="sm">[Professional Title] | [Location]</Text>
  </Grid>
);
