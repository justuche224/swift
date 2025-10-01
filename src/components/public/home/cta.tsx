import { Button } from "@/components/ui/button";
import React from "react";

const CTA = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/16c8f8b48a46fe82d7f8ada3629c694aa7612208.jpg)`,
      }}
      className="w-full h-full py-8 sm:py-12 bg-cover bg-center min-h-[400px] sm:min-h-[500px] relative"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full grid place-content-center px-4 sm:px-6 space-y-4 sm:space-y-5"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,1) 100%)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Ready to Make Their Day?
        </h2>
        <p className="text-center text-base sm:text-lg lg:text-xl text-muted">
          Browse our collection and send your love in just a few clicks.
        </p>
        <Button className="bg-green-500 text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full font-semibold w-fit mx-auto hover:bg-green-600">
          Explore all Gifts
        </Button>
      </div>
    </div>
  );
};

export default CTA;
