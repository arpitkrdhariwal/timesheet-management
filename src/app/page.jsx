import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  try {
    const session = await getServerSession(authOptions);
    redirect(session ? "/timesheets" : "/login");
  } catch (error) {
    console.error("Home page session error:", error);
    redirect("/login");
  }
}
