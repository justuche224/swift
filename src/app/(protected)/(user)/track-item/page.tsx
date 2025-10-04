import React from "react";
import TrackItemPage from "./track-item-page";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverAuth();

  if (!user) {
    return redirect("/login?callbackUrl=/track-item");
  }

  return <TrackItemPage />;
};

export default page;
