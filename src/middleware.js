import "@/lib/set-auth-env";
import { withAuth } from "next-auth/middleware";
import { authOptions } from "@/lib/auth";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  // Edge middleware does not always see NEXTAUTH_SECRET; use the same secret as the API route.
  secret: authOptions.secret,
});

export const config = {
  matcher: ["/timesheets/:path*"],
};
