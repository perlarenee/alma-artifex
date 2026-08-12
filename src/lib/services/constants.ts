import { QueryClient } from '@tanstack/react-query';
import type { IconType } from 'react-icons';
import {
  FaBluesky,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import type { SocialPlatform } from '../../data/types';

export const queryClient = new QueryClient();

export const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  bluesky: FaBluesky,
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  website: FaGlobe,
  youtube: FaYoutube,
};

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  bluesky: 'Bluesky',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'X / Twitter',
  website: 'Website',
  youtube: 'YouTube',
};

export const COPYRIGHT_TEXT = '© 2026 Alma Artifex. All rights reserved.';

export const APP_NAME = 'Alma Artifex';
