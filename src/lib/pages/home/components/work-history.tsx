import { Grid, Heading,Text, Bleed, Box} from '@chakra-ui/react';
import type {Profile} from '@/data/types';

interface WorkHistoryProps {
  profile: Profile;
}

export const WorkHistory = ({profile}: WorkHistoryProps) => (
  <Grid gap={2} textAlign="center">
    <Heading fontWeight="extrabold" size="lg" mb={2}>
      Work History
    </Heading>
    <Text mb={2}>
      work history in chakra timeline format with company name, title, responsibilities and accomplishments. Each entry should be in a card format with a shadow and rounded corners. The timeline should be centered horizontally on the page.
    </Text>
    {profile.workHistory.map((entry, index) => (
      <Box key={index} p={4} borderRadius="md" shadow="sm" bg="whiteAlpha.200">
        <Heading fontWeight="bold" size="md" mb={1}>
          {entry.company}
        </Heading>
      </Box>
    ))}
    <Bleed  inlineStart="8"  bg="blue.200/30" padding="4">
        <Box height="20">Bleed</Box>
      </Bleed>
  </Grid>
)
