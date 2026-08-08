import {
  Box,
  Button,
  Field,
  Grid,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { object, string, ValidationError } from 'yup';

import type { Profile } from '@/data/types';

interface FormContactProps {
  profile: Profile;
}

interface ContactFormValues {
  company: string;
  email: string;
  message: string;
  name: string;
}

const MAX_LENGTHS = {
  email: 254,
  message: 2000,
  name: 100,
} as const;

const sanitizeText = (value: string) => {
  const trimmed = value.trim();
  const withoutTags = trimmed.replace(/<[^>]*>/g, ' ');
  const withoutControlChars = Array.from(withoutTags)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');

  return withoutControlChars.replace(/\s+/g, ' ').trim();
};

export const sanitizeContactFormValues = (
  values: Partial<ContactFormValues>
): ContactFormValues => ({
  company: (values.company ?? '').trim(),
  email: sanitizeText(values.email ?? '').toLowerCase(),
  message: sanitizeText(values.message ?? ''),
  name: sanitizeText(values.name ?? ''),
});

const validationSchema = object({
  company: string().test(
    'honeypot-empty',
    'Unexpected submission',
    (value) => !value || value.trim().length === 0
  ),
  email: string()
    .trim()
    .email('Please enter a valid email address')
    .max(MAX_LENGTHS.email, 'Email is too long')
    .required('Email is required'),
  message: string()
    .trim()
    .max(MAX_LENGTHS.message, 'Message is too long')
    .required('Please enter your message'),
  name: string()
    .trim()
    .max(MAX_LENGTHS.name, 'Name is too long')
    .required('Name is required'),
});

export const validateContactForm = (values: ContactFormValues) => {
  const sanitizedValues = sanitizeContactFormValues(values);

  try {
    validationSchema.validateSync(sanitizedValues, { abortEarly: false });
    return {} as Record<keyof ContactFormValues, string>;
  } catch (error) {
    if (!(error instanceof ValidationError)) {
      return {
        company: 'Unexpected submission',
        email: 'Please enter a valid email address',
        message: 'Please enter your message',
        name: 'Name is required',
      } as Record<keyof ContactFormValues, string>;
    }

    const errors = {} as Record<keyof ContactFormValues, string>;

    for (const item of error.inner) {
      if (item.path) {
        errors[item.path as keyof ContactFormValues] = item.message;
      }
    }

    return errors;
  }
};

const initialValues: ContactFormValues = {
  company: '',
  email: '',
  message: '',
  name: '',
};

const submitContactForm = async (
  values: ContactFormValues,
  helpers: FormikHelpers<ContactFormValues>
) => {
  const sanitizedValues = sanitizeContactFormValues(values);
  const payload = {
    company: sanitizedValues.company,
    email: sanitizedValues.email,
    message: sanitizedValues.message,
    name: sanitizedValues.name,
    recipientEmail: sanitizedValues.email,
    source: 'portfolio-contact-form',
  };

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch('/api/contact', {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    helpers.resetForm();
    helpers.setStatus({ success: true });
  } catch {
    helpers.setStatus({ success: false });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const FormContact = ({ profile }: FormContactProps) => (
  <Grid gap={4} textAlign="center">
    <Heading fontWeight="extrabold" mb={2} size="lg">
      Contact {profile.name}
    </Heading>

    <Formik
      initialValues={initialValues}
      onSubmit={submitContactForm}
      validationSchema={validationSchema}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        status,
        touched,
      }) => (
        <Form>
          <Grid gap={4} maxW="container.md" mx="auto" textAlign="left">
            <Field.Root invalid={Boolean(touched.name && errors.name)}>
              <Field.Label>Name</Field.Label>
              <Input
                maxLength={MAX_LENGTHS.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Your name"
              />
              {touched.name && errors.name ? (
                <Field.ErrorText>{errors.name}</Field.ErrorText>
              ) : null}
            </Field.Root>

            <Field.Root invalid={Boolean(touched.email && errors.email)}>
              <Field.Label>Email</Field.Label>
              <Input
                maxLength={MAX_LENGTHS.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
              />
              {touched.email && errors.email ? (
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              ) : null}
            </Field.Root>

            <Field.Root invalid={Boolean(touched.message && errors.message)}>
              <Field.Label>Message</Field.Label>
              <Textarea
                maxLength={MAX_LENGTHS.message}
                minH="8rem"
                name="message"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Tell me about your project"
              />
              {touched.message && errors.message ? (
                <Field.ErrorText>{errors.message}</Field.ErrorText>
              ) : null}
            </Field.Root>

            <Field.Root position="absolute" style={{ left: '-9999px' }}>
              <Field.Label srOnly>Company</Field.Label>
              <Input
                autoComplete="off"
                name="company"
                onBlur={handleBlur}
                onChange={handleChange}
                tabIndex={-1}
                value={undefined}
              />
            </Field.Root>

            <Button loading={isSubmitting} type="submit" width="full">
              Send Message
            </Button>

            {status?.success ? (
              <Box color="green.600" fontWeight="medium">
                Thanks! Your message has been sent.
              </Box>
            ) : null}

            {status?.success === false ? (
              <Box color="red.600" fontWeight="medium">
                Something went wrong. Please try again later.
              </Box>
            ) : null}
          </Grid>
        </Form>
      )}
    </Formik>
  </Grid>
);
