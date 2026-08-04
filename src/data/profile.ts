// src/data/profile.ts
import type { Profile } from './types';

export const profile: Profile = {
  name: '[Name]',
  jobTitle: '[Job Title]',
  location: '[City], [State], [Country]',
  email: '[email]',
  phone: '[phone number]',
  lookingForWork: true,
  resumeUrl: '/assets/resume.pdf',
  photoUrl: '/assets/photo.jpg',
  videoID: 'EngW7tLk6R8', 
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/janedoe' },
    { platform: 'github', url: 'https://github.com/janedoe' },
  ],
  credentials: [
    { type: 'certification', name: '[Certification Name]', link: '/assets/aws-ssa.png' },
  ],
  workHistory: [
    {
      id: '1',
      company: 'Acme Corp',
      title: 'Frontend Engineer',
      responsibilities: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      accomplishments: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      dateStart: '2022-01-01',
      dateEnd: null,
    },
    {
      id: '2',
      company: 'Acme Corp',
      title: 'Frontend Engineer',
      responsibilities: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      accomplishments: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      dateStart: '2020-01-01',
      dateEnd: '2021-12-31',
    },
  ],
};