// src/data/profile.ts
import type { Profile } from './types';

export const profile: Profile = {
  credentials: [
    {
      img: '/assets/aws-ssa.png',
      link: 'https://www.example.com/certification1',
      name: 'Some Cert1',
      type: 'certification',
      validUntil: '2025-01-01',
    },
    {
      img: '/assets/aws-ssa.png',
      link: 'https://www.example.com/certification2',
      name: 'Some Cert2',
      type: 'certification',
      validUntil: '2024-01-01',
    },
    {
      img: '/assets/aws-ssa.png',
      link: 'https://www.example.com/certification3',
      name: 'Some Cert3',
      type: 'certification',
      validUntil: '2023-01-01',
    },
    {
      img: '/assets/aws-ssa.png',
      link: 'https://www.example.com/certification4',
      name: 'Some Cert4',
      type: 'certification',
      validUntil: '2022-01-01',
    },
  ],
  education: [
    {
      dateEnd: '2019-05-15',
      dateStart: '2015-08-01',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      id: '1',
      institution: 'University of Example',
    },
    {
      dateEnd: '2015-05-15',
      dateStart: '2013-08-01',
      degree: 'Associate of Science',
      fieldOfStudy: 'Information Technology',
      id: '2',
      institution: 'Example Community College',
    },
  ],
  email: '[email]',
  jobTitle: '[Job Title]',
  location: '[City], [State], [Country]',
  longBio:
    'A more detailed bio about yourself, your skills, and your experience. This can include your education, work history, and any other relevant information.',
  name: '[Name]',
  phone: '[phone number]',
  photoUrl: '/assets/photo.jpg',
  profileOptions: [
    {
      colorPalette: 'teal',
      lfwPosition: 'bottom',
      lfwText: '#AVAILABLE FOR HIRE',
      lookingForWork: true,
      textOffset: '25%',
    },
  ],
  resumeUrl: '/assets/resume.pdf',

  shortBio: 'Tagline or short bio about yourself.',
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/janedoe' },
    { platform: 'github', url: 'https://github.com/janedoe' },
  ],
  testimonials: [
    {
      avatarUrl: '/assets/john-doe.jpg',
      company: 'Tech Company',
      id: '1',
      name: 'John Doe',
      quote:
        'Jane is an exceptional developer who consistently delivers high-quality work.',
      role: 'Manager',
      title: 'Senior Developer',
      year: '2023',
    },
    {
      avatarUrl: '/assets/jane-smith.jpg',
      company: 'Another Tech Company',
      id: '2',
      name: 'Jane Smith',
      quote:
        'Working with Jane has been a pleasure. She is a talented developer and a great team player.',
      role: 'Manager',
      title: 'Project Manager',
      year: '2022',
    },
    {
      avatarUrl: '/assets/tom-johnson.jpg',
      company: 'A Law Firm',
      id: '3',
      name: 'Tom Johnson',
      quote:
        'Jane is a highly skilled and dedicated professional. She consistently goes above and beyond to ensure the success of her projects.',
      role: 'Co-worker',
      title: 'Human Resources Manager',
      year: '2020',
    },
  ],
  videoOptions: [
    {
      videoID: '449787858',
      videoQuestion: 'What do you love about your work?',
      videoSource: 'vim',
      videoThumb: '/assets/videoThumb.jpg',
    },
  ],
  workHistory: [
    {
      accomplishments:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      company: 'Acme Corp',
      dateEnd: null,
      dateStart: '2022-01-01',
      id: '1',
      responsibilities:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      title: 'Frontend Engineer',
    },
    {
      accomplishments:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      company: 'Beta Inc',
      dateEnd: '2021-12-31',
      dateStart: '2020-01-01',
      id: '2',
      responsibilities:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      title: 'Frontend Engineer',
    },
    {
      accomplishments:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      company: 'Another Company',
      dateEnd: '2019-12-31',
      dateStart: '2019-01-01',
      id: '3',
      responsibilities:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit. Lorum ipsum dolor sit amet, consectetur adipiscing elit. Lorum ipsum dolor sit amet, consectetur adipiscing elit. Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      title: 'Frontend Engineer',
    },
    {
      accomplishments:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      company: 'Another Company',
      dateEnd: '2018-12-31',
      dateStart: '2018-01-01',
      id: '4',
      responsibilities:
        'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      title: 'Frontend Engineer',
    },
  ],
};
