// src/data/types.ts

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

export interface Profile {
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  phone: string;
  lookingForWork: boolean;
  resumeUrl: string;
  photoUrl: string;
  videoID: string;
  socials: SocialLink[];
  credentials: Credential[];
  workHistory: WorkHistoryEntry[];
}