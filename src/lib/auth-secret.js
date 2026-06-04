/** Shared secret for NextAuth API routes and middleware (must match at runtime). */
export function getAuthSecret() {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    "ticktock-dev-secret-change-me"
  );
}

/** Production / HTTPS deploys use the __Secure- session cookie prefix. */
export function usesSecureAuthCookies() {
  if (process.env.NODE_ENV === "production") return true;
  const url = process.env.NEXTAUTH_URL || process.env.URL || "";
  return url.startsWith("https://");
}
