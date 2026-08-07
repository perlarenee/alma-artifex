import { Box } from '@chakra-ui/react';
import { useProfile } from '@/lib/components/ui/profile-provider';
import { ImageProfile } from './components/image-profile';
import { MetaPerson } from './components/meta-person';
import { ShortBio } from './components/short-bio';
import { LinkTree } from './components/link-tree';
import { CTASection } from './components/cta-section';
import { WorkHistory } from './components/work-history';
import { VideoSection } from './components/video';
import { Credentials } from './components/credentials';
import { Testimonials } from './components/testimonials';
import { FormContact } from './components/form-contact';
import { PageSection } from './components/page-section';

export default function Home() {

  const profile = useProfile();
  if(!profile) return null;
  const options = profile.profileOptions[0];
  const colorPalette = options?.colorPalette ?? 'teal';

  return (
    <Box textAlign="center">
      <PageSection bgLight={colorPalette + '.50'} bgDark="gray.900" maxW={{ base: '98%', md: '2/3', lg: '1/3' }}>

        <ImageProfile photoUrl={profile.photoUrl} options={profile.profileOptions[0]} name={profile.name} />
        <MetaPerson name={profile.name} jobTitle={profile.jobTitle} location={profile.location} />
        <LinkTree socials={profile.socials} />
        <CTASection colorPalette={profile.profileOptions[0].colorPalette}/>
      </PageSection>

      <PageSection bgLight="white" bgDark="gray.800" maxW={{ base: '98%', md: '2/3', lg: '1/3' }}>
        <ShortBio name={profile.name} options={profile.profileOptions[0]} longBio={profile.longBio} shortBio={profile.shortBio} />
      </PageSection>

      <PageSection bgLight={colorPalette + '.50'} bgDark="gray.900" maxW="container.md">
        <WorkHistory name={profile.name} options={profile.profileOptions[0]} workHistory={profile.workHistory} />
      </PageSection>

      <PageSection bgLight="white" bgDark="gray.800" maxW="container.lg">
        <VideoSection profile={profile} />
      </PageSection>

      <PageSection bgLight={colorPalette + '.50'}  bgDark="gray.900" maxW="container.lg">
        <Credentials profile={profile} />
      </PageSection>

      <PageSection bgLight="white" bgDark="gray.800" maxW="container.lg">
        <Testimonials profile={profile} />
      </PageSection>

      <PageSection bgLight={colorPalette + '.50'}  bgDark="gray.900" maxW="container.lg">
        <FormContact profile={profile} />
      </PageSection>
    </Box>
  );
}
