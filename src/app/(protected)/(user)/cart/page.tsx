import React from "react";
import CartPage from "./cart-page";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverAuth();

  if (!user) {
    return redirect("/login?callbackUrl=/cart");
  }
  return (
    <div>
      <CartPage />
    </div>
  );
};

export default page;
