import { QueryClient } from '@tanstack/react-query';
import type { IconType } from 'react-icons';
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaBluesky,
  FaYoutube,
  FaGlobe,
} from 'react-icons/fa6';
import type { SocialPlatform, CredentialType } from '../../data/types';

export const queryClient = new QueryClient();

export const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaXTwitter,
  bluesky: FaBluesky,
  youtube: FaYoutube,
  website: FaGlobe,
};

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'X / Twitter',
  bluesky: 'Bluesky',
  youtube: 'YouTube',
  website: 'Website',
};

export const CREDENTIAL_LABELS: Record<CredentialType, string> = {
  certification: 'Certification',
  degree: 'Degree',
  license: 'License',
  award: 'Award',
};

export const COPYRIGHT_TEXT = '© 2026 Alma Artifex. All rights reserved.';

export const APP_NAME = 'Alma Artifex';