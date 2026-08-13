import { describe, expect, it } from 'vitest';

import {
  sanitizeContactFormValues,
  validateContactForm,
} from '@/lib/pages/home/components/form-contact';

describe('validateContactForm', () => {
  it('requires name, email, and message and rejects a filled honeypot', () => {
    const result = validateContactForm({
      email: 'not-an-email',
      message: '',
      name: '',
      recaptcha: '',
      reference: 'bot',
    });

    expect(result).toEqual({
      email: 'Please enter a valid email address',
      message: 'Please enter your message',
      name: 'Name is required',
      recaptcha: 'Please verify that you are human',
      reference: 'Please complete the form correctly',
    });
  });

  it('sanitizes and normalizes input values before validation', () => {
    const result = sanitizeContactFormValues({
      email: '  USER@Example.COM  ',
      message: '  <b>Hello</b>  ',
      name: '  Alice  ',
      reference: '   ',
    });

    expect(result).toEqual({
      email: 'user@example.com',
      message: 'Hello',
      name: 'Alice',
      recaptcha: '',
      reference: '',
    });
  });
});
