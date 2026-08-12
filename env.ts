import { defineConfig } from '@julr/vite-plugin-validate-env';
import { z } from 'zod';

export default defineConfig({
  schema: {
    ENABLE_PLUGIN_REACT_COMPILER: z.stringbool().optional(),
    VITE_API_BASE_URL: z.url().optional(),
    VITE_CONTACT_API_URL: z.url().optional(),
    VITE_ENABLE_TANSTACK_DEVTOOLS: z.stringbool().optional(),
    VITE_RECAPTCHA_SITE_KEY: z.string().min(1).optional(),
  },
  validator: 'standard',
});
