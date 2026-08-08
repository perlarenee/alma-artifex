import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { MetaPerson } from '@/lib/pages/home/components/meta-person';

describe('MetaPerson', () => {
  it('renders pronouns when provided', () => {
    const html = renderToStaticMarkup(
      <ChakraProvider value={defaultSystem}>
        <MetaPerson
          jobTitle="Designer"
          location="Remote"
          name="Avery"
          pronouns="she/they"
        />
      </ChakraProvider>
    );

    expect(html).toContain('(she/they)');
  });
});
