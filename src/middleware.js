import "@/lib/set-auth-env";
import { withAuth } from "next-auth/middleware";
import { getAuthSecret, usesSecureAuthCookies } from "@/lib/auth-secret";

const secret = getAuthSecret();

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret,
  // Netlify edge middleware often lacks NEXTAUTH_URL, so getToken would look for the
  // non-secure cookie name while NextAuth sets __Secure-next-auth.session-token on HTTPS.
  ...(usesSecureAuthCookies()
    ? {
        cookies: {
          sessionToken: {
            name: "__Secure-next-auth.session-token",
          },
        },
      }
    : {}),
});

export const config = {
  matcher: ["/timesheets/:path*"],
};
