import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import React from "react";
import Testimonials from "../home/testimonials";

const Hero = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('/images/d4d6568e0e98e17af805e007f8e80712ff2de821.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full min-h-[500px] px-4 sm:px-8 bg-cover bg-center"
      ></div>
      <div className="w-full bg-black flex justify-center md:justify-end items-center p-5 gap-2 lg:gap-10">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search for a gift"
            className="bg-white text-black"
          />
          <Button className="bg-green-500 text-black">
            Search <Search className="w-4 h-4" />
          </Button>
        </div>
        <Button>
          Sort by <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="w-full bg-black p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 container mx-auto">
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div
              style={{
                backgroundImage:
                  "url('/images/d4d6568e0e98e17af805e007f8e80712ff2de821.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full aspect-square rounded-xl border-t-8 border-green-500"
            ></div>
            <div className="flex flex-col gap-2">
              <p className="text-white font-bold text-3xl line-clamp-1">
                Gift Name
              </p>
              <p className="text-green-500 font-semibold text-xl">$100</p>
            </div>
          </div>
        ))}
      </div>
      <Testimonials/>   
    </div>
  );
};

export default Hero;
