import { Grid } from '@chakra-ui/react';
import { useProfile } from '@/lib/components/ui/profile-provider';
import {ImageProfile} from './components/image-profile';
import { MetaPerson } from './components/meta-person';
import { ShortBio } from './components/short-bio';
import { LinkTree } from './components/link-tree';
import { CTASection } from './components/cta-section';
import {WorkHistory} from './components/work-history';
import { VideoSection } from './components/video';
import { Credentials } from './components/credentials';
import { Testimonials } from './components/testimonials';
import {FormContact} from './components/form-contact';

export default function Home() {

  const profile = useProfile();
  if(!profile) return null;

  return (
    <>
      <Grid gap={4}>
        <ImageProfile profile={profile} />
        <MetaPerson profile={profile} />
        <LinkTree socials={profile.socials} />
        <CTASection />
        <ShortBio profile={profile} />
        <WorkHistory profile={profile} />
        <VideoSection profile={profile} />
        <Credentials profile={profile} />
        <Testimonials profile={profile} />
        <FormContact profile={profile} />
      </Grid>
      
    </>
  )
};
