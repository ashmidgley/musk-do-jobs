import { ENV } from './core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '3RcpGHB28xYl4YuIo6Rxacmwn2yxNWoR',
  CLIENT_DOMAIN: 'huh.au.auth0.com',
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile'
};
