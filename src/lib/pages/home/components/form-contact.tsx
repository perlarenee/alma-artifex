import { Grid, Heading } from '@chakra-ui/react';

import type { Profile } from '@/data/types';

interface FormContactProps {
  profile: Profile;
}

export const FormContact = ({ profile }: FormContactProps) => (
  <Grid gap={2} textAlign="center">
    <Heading fontWeight="extrabold" mb={2} size="lg">
      Contact Form
      {profile.name}
    </Heading>
    formik form with name, email, message fields and submit button, with
    validation and success message, validated with yup and react-hook-form. On
    submission, emails are sent to aws api, sqs queue, and then to the email
    address specified in the profile. The form should be styled with chakra-ui
    and responsive for mobile and desktop.
  </Grid>
);
