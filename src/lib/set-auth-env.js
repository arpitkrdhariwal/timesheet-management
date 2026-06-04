/**
 * Auth env for local dev, Netlify, and alternate dev ports (e.g. 3001).
 * @see https://next-auth.js.org/configuration/options#nextauth_url
 * @see https://next-auth.js.org/deployment#netlify
 */
export function ensureAuthEnv() {
  const isNetlify = Boolean(process.env.NETLIFY);
  const isDev = process.env.NODE_ENV !== "production";

  // Use the request Host header for callbacks (fixes :3001 vs :3000, preview deploys).
  if (!process.env.AUTH_TRUST_HOST && (isNetlify || isDev)) {
    process.env.AUTH_TRUST_HOST = "true";
  }

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
