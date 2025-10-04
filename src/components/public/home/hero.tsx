import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Truck, MapPin, Clock, Sparkle } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full min-h-svh px-4 sm:px-8 bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 place-content-center items-center mt-10">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border-green-500 border rounded-full px-3 sm:px-4 py-2 text-white text-xs sm:text-sm">
              <Sparkle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <span>Delivering Smiles Worldwide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-semibold text-white leading-tight">
              Send Gifts <span className="text-green-500">and</span> Packages
              Swiftly Across the Miles
            </h1>

            <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              We deliver handpicked gifts; flowers, cakes, clothes and more
              directly to your loved ones overseas. Faster, easier and reliable.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button className="bg-green-500 text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full font-semibold hover:bg-green-600">
                <Link href="/gift-catalog">Send a Package</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-black text-white border-green-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full font-semibold hover:bg-gray-800"
                asChild
              >
                <Link href="/track-item">Track Your Order</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-white text-sm sm:text-base">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-white text-sm sm:text-base">
                  200+ Countries
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-white text-sm sm:text-base">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative">
              <Image
                src="/images/16c8f8b48a46fe82d7f8ada3629c694aa7612208.jpg"
                alt="Happy family with gifts"
                width={600}
                height={600}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] 2xl:h-[600px] object-cover rounded-2xl"
              />

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-green-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-1 sm:-space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+</span>
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">
                  4.9 Star Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
