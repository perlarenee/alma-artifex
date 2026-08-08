// src/data/profile.ts
import type { Profile } from './types';

export const profile: Profile = {
  name: '[Name]',
  jobTitle: '[Job Title]',
  location: '[City], [State], [Country]',
  email: '[email]',
  phone: '[phone number]',
  
  shortBio: 'Tagline or short bio about yourself.',
  longBio: 'A more detailed bio about yourself, your skills, and your experience. This can include your education, work history, and any other relevant information.',
  resumeUrl: '/assets/resume.pdf',
  photoUrl: '/assets/photo.jpg',
  videoOptions: [
    {
      videoSource: "vim",
      videoID: '449787858', 
      videoThumb: '/assets/videoThumb.jpg',
      videoQuestion: "What do you love about your work?"
    }
  ],
  profileOptions: [
    {
      lookingForWork: true,
      lfwPosition: 'bottom',
      lfwText: '#AVAILABLE FOR HIRE',
      colorPalette: 'purple',
      textOffset: "25%",
    }
  ],
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/janedoe' },
    { platform: 'github', url: 'https://github.com/janedoe' },
  ],
  credentials: [
    { type: 'certification', name: '[Certification Name]', link: '/assets/aws-ssa.png' },
  ],
  testimonials: [
    {
      id: '1',
      name: 'John Doe',
        title: 'Senior Developer',
        company: 'Tech Company',
        quote: 'Jane is an exceptional developer who consistently delivers high-quality work.',
        avatarUrl: '/assets/john-doe.jpg',
        role: 'Manager',
        year: '2023',
    },
    {
        id: '2',
        name: 'Jane Smith',
        title: 'Project Manager',
        company: 'Another Tech Company',
        quote: 'Working with Jane has been a pleasure. She is a talented developer and a great team player.',
        avatarUrl: '/assets/jane-smith.jpg',
        role: 'Manager',
        year: '2022',
    },
    {
        id: '3',
        name: 'Tom Johnson',
        title: 'Human Resources Manager',
        company: 'A Law Firm',
        quote: 'Jane is a highly skilled and dedicated professional. She consistently goes above and beyond to ensure the success of her projects.',
        avatarUrl: '/assets/tom-johnson.jpg',
        role: 'Co-worker',
        year: '2020',
    },
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
      company: 'Beta Inc',
      title: 'Frontend Engineer',
      responsibilities: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      accomplishments: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      dateStart: '2020-01-01',
      dateEnd: '2021-12-31',
    },
    {
      id: '3',
      company: 'Another Company',
      title: 'Frontend Engineer',
      responsibilities: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit. Lorum ipsum dolor sit amet, consectetur adipiscing elit. Lorum ipsum dolor sit amet, consectetur adipiscing elit. Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      accomplishments: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      dateStart: '2019-01-01',
      dateEnd: '2019-12-31',
    },
    {
      id: '4',
      company: 'Another Company',
      title: 'Frontend Engineer',
      responsibilities: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      accomplishments: 'Lorum ipsum dolor sit amet, consectetur adipiscing elit.',
      dateStart: '2018-01-01',
      dateEnd: '2018-12-31',
    },
  ],
};