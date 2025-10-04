import React from "react";
import Nav from "@/components/public/nav";
import Footer from "@/components/public/footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
