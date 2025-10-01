import { LoginForm } from "@/components/public/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh mt-[-60px] lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/beautiful-gourmet-meal-plated-elegantly-on-white-p.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
