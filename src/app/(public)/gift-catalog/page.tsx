import Hero from "@/components/public/gifts/hero";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Hero />
      </Suspense>
    </div>
  );
};

export default page;
