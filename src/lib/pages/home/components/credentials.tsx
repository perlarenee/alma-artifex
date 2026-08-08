import {
  Box,
  Button,
  Card,
  Grid,
  Heading,
  Image,
  Link,
  Span,
  Text,
} from '@chakra-ui/react';
import { FaCertificate } from 'react-icons/fa';

import type { Credential, ProfileOptions } from '@/data/types';

interface CredentialsProps {
  colorPalette?: string;
  credentials: Array<Credential>;
  name: string;
  options: ProfileOptions;
}

export const Credentials = ({
  name,
  credentials,
  colorPalette = 'purple',
}: CredentialsProps) => {
  const formatDate = (value: string | null) => {
    if (!value) {
      return 'Current';
    }
    const date = new Date(value);
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
      <Heading fontWeight="extrabold" mb={2} size="lg">
        Credentials & Education
      </Heading>

      {credentials.length > 0 ? (
        <Grid
          gap={4}
          mx="auto"
          templateColumns={{
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {credentials.map((credential) => (
            <>
              <Card.Root
                alignItems="flex-start"
                borderRadius="md"
                borderWidth="1px"
                boxShadow="md"
                flex="1"
                flexDirection="row"
                gap={4}
                key={credential.name}
                maxW="xl"
                overflow="hidden"
                p={6}
                textAlign="left"
                textStyle="sm"
              >
                {credential.img ? (
                  <Box m="0" maxW="1/3" p="0">
                    <Image
                      alt={credential.name}
                      objectFit="fill"
                      src={credential.img}
                    />
                  </Box>
                ) : null}
                <Box m="0" maxW="2/3" p="0">
                  <Card.Body gap="2">
                    <Card.Title>{credential.name}</Card.Title>
                    <Card.Description>
                      <Text>
                        <Span fontWeight="bold">Type:</Span> {credential.type}
                      </Text>
                      {credential.validUntil ? (
                        <Text>
                          <Span fontWeight="bold">Valid Until:</Span>{' '}
                          {formatDate(credential.validUntil)}
                        </Text>
                      ) : null}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer gap="2">
                    {credential.link ? (
                      <Button asChild colorPalette={colorPalette} size="sm">
                        <Link
                          href={credential.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <FaCertificate /> View Credential
                        </Link>
                      </Button>
                    ) : null}
                  </Card.Footer>
                </Box>
              </Card.Root>
            </>
          ))}
        </Grid>
      ) : (
        <Text color="fg.muted">{name} has no credentials listed yet.</Text>
      )}
    </Grid>
  );
};
