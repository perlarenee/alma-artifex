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
  img: string;
  link?: string;
  name: string;
  type: CredentialType;
  validUntil?: string; // ISO date, e.g. "2022-01-01"
}

export interface EducationEntry {
  dateEnd: string | null; // null = current
  dateStart: string; // ISO date, e.g. "2022-01-01"
  degree: string;
  fieldOfStudy: string;
  id?: string;
  institution: string;
}

export interface WorkHistoryEntry {
  accomplishments: string; // markdown
  company: string;
  dateEnd: string | null; // null = current
  dateStart: string; // ISO date, e.g. "2022-01-01"
  id: string;
  responsibilities: string; // markdown
  title: string;
}

export interface Testimonials {
  avatarUrl?: string;
  company: string;
  id: string;
  name: string;
  quote: string; // markdown
  role?: string;
  title: string;
  year?: string;
}

export type ColorPalette =
  | 'teal'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'orange';

export interface ProfileOptions {
  colorPalette: ColorPalette;
  lfwPosition: 'top' | 'bottom';
  lfwText: string;
  lookingForWork: boolean;
  textOffset?: string;
}

export interface VideoOptions {
  videoID: string;
  videoQuestion?: string;
  videoSource: 'yt' | 'vim';
  videoThumb?: string;
}

export interface Profile {
  credentials: Array<Credential>;
  education: Array<EducationEntry>;
  email: string;
  jobTitle: string;
  location: string;
  longBio: string;
  name: string;
  nickname?: string;
  phone: string;
  photoUrl: string;
  portfolioUrl?: string;
  profileOptions: Array<ProfileOptions>;
  pronouns?: string;
  resumeUrl: string;
  shortBio: string;
  socials: Array<SocialLink>;
  testimonials: Array<Testimonials>;
  videoOptions: Array<VideoOptions>;
  workHistory: Array<WorkHistoryEntry>;
}

export interface PageSectionProps {
  bgDark?: string;
  bgLight?: string;
  children: ReactNode;
  gap?: string | number | Record<string, string | number>;
  id?: string;
  maxW?: string | number | Record<string, string | number>;
  px?: string | number | Record<string, string | number>;
  py?: string | number | Record<string, string | number>;
}
