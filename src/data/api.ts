// src/data/api.ts
import { profile } from './profile';
import type { Profile } from './types';

export async function getProfile(): Promise<Profile> {
  return Promise.resolve(profile);
}