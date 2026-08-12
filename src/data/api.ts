// src/data/api.ts
import type { Profile } from './types';

let cachedProfile: Promise<Profile> | null = null;

export function getProfile(): Promise<Profile> {
  if (!cachedProfile) {
    cachedProfile = import('./profile.json').then(
      (mod) => mod.default as Profile
    );
  }
  return cachedProfile;
}

export function invalidateProfileCache(): void {
  cachedProfile = null;
}

export function updateProfile(updated: Profile): Promise<Profile> {
  invalidateProfileCache();
  cachedProfile = Promise.resolve(updated);
  return cachedProfile;
}
