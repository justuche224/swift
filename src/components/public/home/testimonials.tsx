import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkle } from "lucide-react";
import React from "react";

const items = [
  {
    author: "Cynthia M. (Sent to UK)",
    content:
      "My sister was in tears when she got the birthday cake in London. Thank you for making me feel close to her! cake in London. Thank you for making me feel close to her!",
  },
  {
    author: "John D. (Sent to USA)",
    content:
      "The flowers were fresh and beautiful. The process was so easy. I'll definitely use this service again!",
  },
];

const Claim = () => {
  return (
    <div id="testimonials" className="bg-white w-full py-12 px-6 flex flex-col items-center justify-center text-black gap-12">
      <div className="space-y-4 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 border-green-500 border rounded-full px-4 py-2 text-sm">
          <Sparkle className="w-4 h-4" />
          <span>Happy Customers.</span>
        </div>
        <h2 className="text-center text-xl lg:text-2xl xl:text-4xl 2xl:text-6xl font-semibold">
          <span className="block">Spreading Joy Worldwide</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-7xl mx-auto">
        {items.map((item, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardContent>
              <p className="line-clamp-3">&quot;{item.content}&quot;</p>
            </CardContent>
            <CardFooter>
              -{" "}<p className="text-green-500 font-semibold">{item.author}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Claim;
