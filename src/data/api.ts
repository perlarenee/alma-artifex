// src/data/api.ts

import { profile } from './profile';
import type { Profile } from './types';

// Module-level cache — persists for the lifetime of the page/session,
// shared by every caller (Context provider, router loader, anything else).
let cachedProfile: Promise<Profile> | null = null;

/**
 * Returns the current profile, fetching only once per session.
 * Later: replace the Promise.resolve(profile) line with a real fetch,
 * e.g. fetch('/api/profile').then(res => res.json())
 */
export function getProfile(): Promise<Profile> {
  if (!cachedProfile) {
    cachedProfile = Promise.resolve(profile);
  }
  return cachedProfile;
}

/**
 * Clears the cache, forcing the next getProfile() call to refetch.
 * Not called anywhere yet — reserved for when an editor exists and
 * a save/write needs to guarantee the owner sees their own change.
 */
export function invalidateProfileCache(): void {
  cachedProfile = null;
}

/**
 * Placeholder for the future editor's save flow.
 * Not wired to any UI yet —  documenting the intended shape.
 * Later: this will PUT/POST to a Lambda endpoint that writes to DynamoDB.
 */
export function updateProfile(updated: Profile): Promise<Profile> {
  invalidateProfileCache();
  // later: await fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updated) });
  cachedProfile = Promise.resolve(updated);
  return cachedProfile;
}
