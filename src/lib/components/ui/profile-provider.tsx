// src/data/profile-context.tsx

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {getProfile} from '@/data/api';
import type {Profile} from '@/data/types';

const ProfileContext = createContext<Profile | null>(null);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);