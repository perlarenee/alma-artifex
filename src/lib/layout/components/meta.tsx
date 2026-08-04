import {APP_NAME} from '@/lib/services/constants';

export const Meta = () => (
  <>
    <title>{APP_NAME}: [Name] - [Professional Title]</title>
    <meta content={`${APP_NAME}: [Name] - [Professional Title]`} name="description" />

    <meta content={APP_NAME} name="application-name" />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="default" name="apple-mobile-web-app-status-bar-style" />
    <meta content={APP_NAME} name="apple-mobile-web-app-title" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="yes" name="mobile-web-app-capable" />
    <meta content="#FFFFFF" name="theme-color" />

    <link href="/favicon.svg" rel="shortcut icon" />
  </>
);
