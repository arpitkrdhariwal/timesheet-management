/**
 * Sets NEXTAUTH_URL from Netlify system env when not configured manually.
 * https://docs.netlify.com/configure-builds/environment-variables/
 */
export function ensureAuthEnv() {
  if (process.env.NEXTAUTH_URL) return;

  const candidates = [
    process.env.DEPLOY_URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.URL,
  ].filter(Boolean);

  if (candidates.length > 0) {
    const url = candidates[0];
    process.env.NEXTAUTH_URL = url.startsWith("http") ? url : `https://${url}`;
  }
}

ensureAuthEnv();
