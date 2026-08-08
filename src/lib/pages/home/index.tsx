import { Box } from '@chakra-ui/react';

import { useProfile } from '@/lib/components/ui/profile-provider';

import { Credentials } from './components/credentials';
import { CTASection } from './components/cta-section';
import { Education } from './components/education';
import { FormContact } from './components/form-contact';
import { ImageProfile } from './components/image-profile';
import { LinkTree } from './components/link-tree';
import { MetaPerson } from './components/meta-person';
import { PageSection } from './components/page-section';
import { ShortBio } from './components/short-bio';
import { TestimonialMarquee } from './components/testimonials';
import { VideoSection } from './components/video';
import { WorkHistory } from './components/work-history';

export default function Home() {
  const profile = useProfile();
  if (!profile) {
    return null;
  }

  const [options] = profile.profileOptions;
  const colorPalette = options?.colorPalette ?? 'teal';

  return (
    <Box textAlign="center">
      <PageSection
        bgDark="gray.900"
        bgLight={`${colorPalette}.50`}
        maxW={{ base: '98%', lg: '1/2' }}
      >
        <ImageProfile
          name={profile.name}
          options={profile.profileOptions[0]}
          photoUrl={profile.photoUrl}
        />
        <MetaPerson
          jobTitle={profile.jobTitle}
          location={profile.location}
          name={profile.name}
        />
        <LinkTree socials={profile.socials} />
        <CTASection colorPalette={profile.profileOptions[0].colorPalette} />
      </PageSection>

      <PageSection
        bgDark="gray.800"
        bgLight="white"
        maxW={{ base: '98%', lg: '1/2', md: '2/3' }}
      >
        <ShortBio
          longBio={profile.longBio}
          name={profile.name}
          options={profile.profileOptions[0]}
          shortBio={profile.shortBio}
        />
      </PageSection>

      <PageSection
        bgDark="gray.900"
        bgLight={`${colorPalette}.50`}
        maxW={{ base: '98%', lg: '4/5' }}
      >
        <WorkHistory
          name={profile.name}
          options={profile.profileOptions[0]}
          workHistory={profile.workHistory}
        />
      </PageSection>

      <PageSection
        bgDark="gray.800"
        bgLight="white"
        maxW={{ base: '98%', lg: '1/2', md: '2/3' }}
      >
        <VideoSection videoOptions={profile.videoOptions} />
      </PageSection>

      <PageSection
        bgDark="gray.900"
        bgLight={`${colorPalette}.50`}
        maxW={{ base: '98%', lg: '4/5' }}
      >
        <Credentials
          colorPalette={profile.profileOptions[0].colorPalette}
          credentials={profile.credentials}
          name={profile.name}
          options={profile.profileOptions[0]}
        />
        <Education education={profile.education} />
      </PageSection>

      <PageSection
        bgDark="gray.800"
        bgLight="white"
        maxW={{ base: '98%', lg: '4/5' }}
      >
        <TestimonialMarquee testimonials={profile.testimonials} />
      </PageSection>

      <PageSection
        bgDark="gray.900"
        bgLight={`${colorPalette}.50`}
        maxW="container.lg"
      >
        <FormContact profile={profile} />
      </PageSection>
    </Box>
  );
}
