// src/data/types.ts

import type { ReactNode } from 'react';

export type SocialPlatform =
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'bluesky'
  | 'youtube'
  | 'website';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export type CredentialType = 'certification' | 'degree' | 'license' | 'award';

export interface Credential {
  type: CredentialType;
  name: string;
  link?: string;
}

export interface WorkHistoryEntry {
  id: string;
  company: string;
  title: string;
  responsibilities: string; // markdown
  accomplishments: string;  // markdown
  dateStart: string;        // ISO date, e.g. "2022-01-01"
  dateEnd: string | null;   // null = current
}

export interface Testimonials {
    id: string;
    name: string;
    title: string;
    company: string;
    quote: string; // markdown
    avatarUrl?: string;
    role?: string;
    year?: string;
}

export type ColorPalette = 'teal' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'orange';

export interface ProfileOptions {
  lookingForWork: boolean;
  lfwPosition: 'top' | 'bottom';
  lfwText: string;
  colorPalette: ColorPalette; 
  textOffset?: string; 
}

export interface VideoOptions {
  videoSource: 'yt' | 'vim';
  videoID: string;
  videoThumb?: string;
  videoQuestion?: string;
}

export interface Profile {
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  phone: string;
  profileOptions: ProfileOptions[];
    shortBio: string;
    longBio: string;
  resumeUrl: string;
  photoUrl: string;
  videoOptions: VideoOptions[];
  socials: SocialLink[];
  credentials: Credential[];
  testimonials: Testimonials[];
  workHistory: WorkHistoryEntry[];
}

export interface PageSectionProps {
  children: ReactNode;
  bgLight?: string;
  bgDark?: string;
  maxW?: string | number | Record<string, string | number>;
  py?: string | number | Record<string, string | number>;
  px?: string | number | Record<string, string | number>;
  gap?: string | number | Record<string, string | number>;
}
