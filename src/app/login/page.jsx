import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
      <div className="hidden w-1/2 flex-col justify-center bg-blue-700 px-12 lg:flex">
        <h2 className="text-4xl font-bold text-white">ticktock</h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-blue-100">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours.
        </p>
      </div>
    </div>
  );
}
