import Hero from "@/components/public/gifts/hero";
import React, { Suspense } from "react";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverAuth();

  if (!user) {
    return redirect("/login?callbackUrl=/gift-catalog");
  }
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Hero />
      </Suspense>
    </div>
  );
};

export default page;
