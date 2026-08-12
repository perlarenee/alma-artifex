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

export type CredentialType =
  | 'Specialization Certificate'
  | 'Professional Certificate'
  | 'Certification'
  | 'Degree'
  | 'License'
  | 'Award'
  | 'Completion Certificate'
  | 'Other';

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

export interface WorkHistoryBlockParagraph {
  text: string;
  type: 'paragraph';
}

export interface WorkHistoryBlockList {
  items: Array<string>;
  type: 'list';
}

export type WorkHistoryContentBlock =
  | WorkHistoryBlockParagraph
  | WorkHistoryBlockList;

export interface WorkHistoryEntry {
  accomplishments: string | Array<WorkHistoryContentBlock>; // markdown or structured blocks
  company: string;
  dateEnd: string | null; // null = current
  dateStart: string; // ISO date, e.g. "2022-01-01"
  id: string;
  responsibilities: string | Array<WorkHistoryContentBlock>; // markdown or structured blocks
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
  | 'cyan'
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
  transcript: string;
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
  longBio: string; // supports basic HTML such as <p> and <strong>
  name: string;
  nickname: string;
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
