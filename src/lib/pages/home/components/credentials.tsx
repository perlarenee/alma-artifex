import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Span,
  Text,
} from '@chakra-ui/react';
import { FaCertificate } from 'react-icons/fa';

import type { Credential, ProfileOptions } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';

interface CredentialsProps {
  colorPalette?: string;
  credentials?: Array<Credential>;
  name: string;
  options: ProfileOptions;
}

export const Credentials = ({
  name,
  credentials = [],
  colorPalette = 'purple',
}: CredentialsProps) => {
  const formatDate = (value: string | null) => {
    if (!value) {
      return 'Current';
    }

    const normalizedValue = value.includes('T') ? value : `${value}T00:00:00`;
    const date = new Date(normalizedValue);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Grid gap={4} textAlign="center">
      <RevealOnScroll>
        <Heading size={{ base: 'xl', lg: '3xl', md: '2xl' }}>
          CERTIFICATIONS & CREDENTIALS
        </Heading>
      </RevealOnScroll>

      <RevealOnScroll>
        {credentials.length > 0 ? (
          <Flex
            alignItems="stretch"
            columnGap="2%"
            direction={{ base: 'column', md: 'row' }}
            flexWrap="wrap"
            justifyContent="center"
            rowGap={6}
            textAlign="center"
          >
            {credentials.map((credential) => (
              <Card.Root
                alignItems="flex-start"
                borderRadius="md"
                borderWidth="1px"
                boxShadow="md"
                flexDirection="row"
                gap={6}
                justifyContent="space-between"
                key={credential.name}
                overflow="hidden"
                p={6}
                textAlign="left"
                textStyle="sm"
                width={{ base: '100%', lg: '31%', md: '48%' }}
              >
                {credential.img ? (
                  <Box m="0" p="0" width="33%">
                    <Image
                      alt={credential.name}
                      objectFit="fill"
                      src={credential.img}
                    />
                  </Box>
                ) : null}
                <Box
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  justifyContent="space-between"
                  m="0"
                  p="0"
                  width="66%"
                >
                  <Card.Body
                    alignItems="flex-start"
                    gap="2"
                    height="100%"
                    justifyContent="space-between"
                    p="0"
                  >
                    <Card.Title textStyle="sm">{credential.name}</Card.Title>
                    <Text fontSize="0.8rem">
                      <Span fontWeight="bold">Type:</Span> {credential.type}
                    </Text>
                    {credential.validUntil ? (
                      <Text fontSize="0.8rem">
                        <Span fontWeight="bold">Valid Until:</Span>{' '}
                        {formatDate(credential.validUntil)}
                      </Text>
                    ) : null}

                    {credential.link ? (
                      <Button
                        asChild
                        colorPalette={colorPalette}
                        fontSize="0.8rem"
                        mt="4"
                        size="sm"
                      >
                        <Link
                          href={credential.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <FaCertificate /> View Credential
                        </Link>
                      </Button>
                    ) : null}
                  </Card.Body>
                </Box>
              </Card.Root>
            ))}
          </Flex>
        ) : (
          <Text color="fg.muted">{name} has no credentials listed yet.</Text>
        )}
      </RevealOnScroll>
    </Grid>
  );
};
