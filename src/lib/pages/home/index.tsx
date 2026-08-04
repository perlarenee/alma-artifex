import { Grid } from '@chakra-ui/react';
import {useEffect, useState} from 'react';

import {getProfile} from '@/data/api';
import type {Profile} from '@/data/types';
import { LinkTree } from './components/link-tree';
import { ShortBio } from './components/short-bio';

import { CTASection } from './components/cta-section';

export default function Home() {

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then((data) => setProfile(data));
  }, []);

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
