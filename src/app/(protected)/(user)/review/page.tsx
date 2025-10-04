import React from "react";
import ReviewPage from "./review-page";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverAuth();

  if (!user) {
    return redirect("/login?callbackUrl=/review");
  }
  return (
    <div>
      <ReviewPage />
    </div>
  );
};

export default page;
