import { Box, Flex, Link } from '@chakra-ui/react';
import { FaIdCard } from 'react-icons/fa';

import { Button } from '@/lib/components/ui/button';

const repoName = 'vite-react-chakra-starter';
const repoLink = `https://github.com/agustinusnathaniel/${repoName}`;

export const CTASection = () => (
  <Box textAlign="center">
    <Flex gridGap={2} justifyContent="center" marginY={4}>
      <Button asChild size="sm">
        <Link
          href={`${repoLink}/generate`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Contact Me
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={repoLink} rel="noopener noreferrer" target="_blank">
          <FaIdCard /> Download Resume
        </Link>
      </Button>
    </Flex>
    
  </Box>
);
