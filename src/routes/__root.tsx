import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { getProfile } from '@/data/api';
import { Layout } from '@/lib/layout';

const description = 'Alma Artifex';
const url = 'https://alma-artifex.com';
const ogImgUrl = 'https://alma-artifex.com/assets/screenshot.jpg';

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Layout>
        <Outlet />
      </Layout>
      {import.meta.env.VITE_ENABLE_TANSTACK_DEVTOOLS ? (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      ) : null}
    </>
  ),
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.name} — ${loaderData.jobTitle}`
      : 'Loading...';
    const desc = loaderData
      ? `${loaderData.name}, ${loaderData.jobTitle} based in ${loaderData.location}`
      : description;

    return {
      links: [
        { href: '/favicon.ico', rel: 'icon' },
        { href: '/apple-touch-icon-180x180.png', rel: 'apple-touch-icon' },
        { href: '/site.webmanifest', rel: 'manifest' },
      ],
      meta: [
        { title },
        { content: desc, name: 'description' },
        { content: 'width=device-width, initial-scale=1.0', name: 'viewport' },
        { content: title, name: 'application-name' },
        { content: 'yes', name: 'apple-mobile-web-app-capable' },
        { content: 'default', name: 'apple-mobile-web-app-status-bar-style' },
        { content: title, name: 'apple-mobile-web-app-title' },
        { content: 'telephone=no', name: 'format-detection' },
        { content: 'yes', name: 'mobile-web-app-capable' },
        { content: '#000000', name: 'theme-color' },
        { content: 'website', name: 'og:type' },
        { content: url, name: 'og:url' },
        { content: title, name: 'og:title' },
        { content: desc, name: 'og:description' },
        { content: ogImgUrl, name: 'og:image' },
        { content: 'summary_large_image', name: 'twitter:card' },
        { content: url, name: 'twitter:url' },
        { content: title, name: 'twitter:title' },
        { content: desc, name: 'twitter:description' },
        { content: ogImgUrl, name: 'twitter:image' },
      ],
    };
  },
  loader: () => getProfile(),
});
