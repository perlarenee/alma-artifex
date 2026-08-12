import { describe, expect, it } from 'vitest';

import { normalizeWorkHistoryContent } from '@/lib/pages/home/components/work-history';

describe('normalizeWorkHistoryContent', () => {
  it('converts legacy string content into paragraph and list blocks', () => {
    expect(normalizeWorkHistoryContent('<p>Intro text</p>')).toEqual([
      { text: 'Intro text', type: 'paragraph' },
    ]);

    expect(
      normalizeWorkHistoryContent('<ul><li>One</li><li>Two</li></ul>')
    ).toEqual([{ items: ['One', 'Two'], type: 'list' }]);
  });

  it('returns existing block arrays unchanged', () => {
    const content = [
      { text: 'Paragraph', type: 'paragraph' as const },
      { items: ['One', 'Two'], type: 'list' as const },
    ];

    expect(normalizeWorkHistoryContent(content)).toEqual(content);
  });
});
