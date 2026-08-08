import { describe, expect, it } from 'vitest';

import {
  sanitizeContactFormValues,
  validateContactForm,
} from '@/lib/pages/home/components/form-contact';

describe('validateContactForm', () => {
  it('requires name, email, and message and rejects a filled honeypot', () => {
    const result = validateContactForm({
      company: 'bot',
      email: 'not-an-email',
      message: '',
      name: '',
    });

    expect(result).toEqual({
      company: 'Unexpected submission',
      email: 'Please enter a valid email address',
      message: 'Please enter your message',
      name: 'Name is required',
    });
  });

  it('sanitizes and normalizes input values before validation', () => {
    const result = sanitizeContactFormValues({
      company: '   ',
      email: '  USER@Example.COM  ',
      message: '  <b>Hello</b>  ',
      name: '  Alice  ',
    });

    expect(result).toEqual({
      company: '',
      email: 'user@example.com',
      message: 'Hello',
      name: 'Alice',
    });
  });
});
