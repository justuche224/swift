import { Separator } from "@/components/ui/separator";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import React from "react";

const Demo = () => {
  return (
    <div className="bg-white w-full py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-black gap-8 sm:gap-12">
      <div className="space-y-4 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 border-green-500 border rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <Sparkle className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>As Simple As 1, 2, 3</span>
        </div>
        <h2 className="text-center text-lg sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-6xl font-semibold">
          <span className="block">Here&apos;s How We Deliver </span>
          <span className="block">Your Love Packages</span>
        </h2>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 container mx-auto max-w-4xl 2xl:max-w-5xl">
        <div className="w-full flex flex-col justify-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-muted-foreground text-sm sm:text-base">
              01.
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl font-semibold">
              Browse & Choose
            </span>
          </div>
          <Separator className="my-3 sm:my-5" />
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-muted-foreground text-sm sm:text-base">
              02.
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl font-semibold">
              Tell Us Who & Where
            </span>
          </div>
          <Separator className="my-3 sm:my-5" />
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-muted-foreground text-sm sm:text-base">
              03.
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl font-semibold">
              We Deliver the Smile
            </span>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/images/117872c65b13be650d6b3fdb707a9ff9f6db44ac.jpg"
            alt="demo"
            width={500}
            height={500}
            className="aspect-square object-cover rounded-xl border-4 border-black w-64 sm:w-80 lg:w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
