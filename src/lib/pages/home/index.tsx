import { Grid } from '@chakra-ui/react';
import { useProfile } from '@/lib/components/ui/profile-provider';
import { LinkTree } from './components/link-tree';
import { ShortBio } from './components/short-bio';

import { CTASection } from './components/cta-section';

export default function Home() {

  const profile = useProfile();
  
  if(!profile) return null;

  return (
    <>
      <Grid gap={4}>
        <ShortBio profile={profile} />
        <LinkTree socials={profile.socials} />
        <CTASection />
    </Grid>
    </>
  )
};
