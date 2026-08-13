import { Box, Button, Field, Grid, Input, Textarea } from '@chakra-ui/react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { type RefObject, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { object, string, ValidationError } from 'yup';

import type { Profile } from '@/data/types';
import { RevealOnScroll } from '@/lib/components/ui/reveal-on-scroll';
import { SectionHeader } from '@/lib/components/ui/section-header';

interface FormContactProps {
  profile: Profile;
}

interface ContactFormValues {
  email: string;
  message: string;
  name: string;
  reference: string;
}

interface RecaptchaHandle {
  getValue: () => string;
  reset: () => void;
}

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL ?? '/api/contact';
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';

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
  email: sanitizeText(values.email ?? '').toLowerCase(),
  message: sanitizeText(values.message ?? ''),
  name: sanitizeText(values.name ?? ''),
  reference: (values.reference ?? '').trim(),
});

const validationSchema = object({
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
  reference: string().test(
    'honeypot-empty',
    'Please complete the form correctly',
    (value) => !value || value.trim().length === 0
  ),
});

export const validateContactForm = (values: ContactFormValues) => {
  const sanitizedValues = sanitizeContactFormValues(values);

  try {
    validationSchema.validateSync(sanitizedValues, { abortEarly: false });
    return {} as Record<keyof ContactFormValues, string>;
  } catch (error) {
    if (!(error instanceof ValidationError)) {
      return {
        email: 'Please enter a valid email address',
        message: 'Please enter your message',
        name: 'Name is required',
        reference: 'Please complete the form correctly',
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
  email: '',
  message: '',
  name: '',
  reference: '',
};

const submitContactForm = async (
  values: ContactFormValues,
  helpers: FormikHelpers<ContactFormValues>,
  recaptchaRef: RefObject<RecaptchaHandle | null>
) => {
  const sanitizedValues = sanitizeContactFormValues(values);
  const recaptchaToken = recaptchaRef.current?.getValue() ?? '';

  const payload = {
    captchaToken: recaptchaToken ?? '',
    email: sanitizedValues.email,
    message: sanitizedValues.message,
    name: sanitizedValues.name,
    reference: sanitizedValues.reference,
    source: 'portfolio-contact-form',
  };

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(contactApiUrl, {
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
    recaptchaRef.current?.reset();
    helpers.setStatus({ success: true });
  } catch {
    recaptchaRef.current?.reset();
    helpers.setStatus({ success: false });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const FormContact = ({ profile }: FormContactProps) => {
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const handleSubmit = (
    values: ContactFormValues,
    helpers: FormikHelpers<ContactFormValues>
  ) => submitContactForm(values, helpers, recaptchaRef);

  return (
    <Grid gap={4} textAlign="center">
      <RevealOnScroll>
        <SectionHeader p={4}>CONTACT - {profile.name}</SectionHeader>
      </RevealOnScroll>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
          <RevealOnScroll>
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

                <Field.Root
                  invalid={Boolean(touched.message && errors.message)}
                >
                  <Field.Label>Message</Field.Label>
                  <Textarea
                    maxLength={MAX_LENGTHS.message}
                    minH="8rem"
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                  />
                  {touched.message && errors.message ? (
                    <Field.ErrorText>{errors.message}</Field.ErrorText>
                  ) : null}
                </Field.Root>

                <Field.Root position="absolute" style={{ left: '-9999px' }}>
                  <Field.Label srOnly>Reference</Field.Label>
                  <Input
                    autoComplete="off"
                    name="reference"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    tabIndex={-1}
                    value={undefined}
                  />
                </Field.Root>

                {recaptchaSiteKey ? (
                  <Box>
                    <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaSiteKey} />
                  </Box>
                ) : null}

                <Button
                  colorPalette={profile.profileOptions[0].colorPalette}
                  loading={isSubmitting}
                  type="submit"
                  width="full"
                >
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
          </RevealOnScroll>
        )}
      </Formik>
    </Grid>
  );
};
