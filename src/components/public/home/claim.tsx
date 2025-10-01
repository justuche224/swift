import { Sparkle } from "lucide-react";
import React from "react";

const items = [
  {
    title: "Fresh Flowers",
    image: "/images/2e2d320a398eec80f1a81b90ec6138a859952799.jpg",
  },
  {
    title: "Personalized Gifts",
    image: "/images/1990d1cb4b65537fa025c5a8552c628ac4cbeb67.jpg",
  },
  {
    title: "Delicious Cakes",
    image: "/images/a4604d9b5e1d6312bc0feb25bef0579c4085504f.jpg",
  },
  {
    title: "Fashion & Apparel",
    image: "/images/3a8eab99f380958c7e81ea584b2c15a3fcb9fae4.jpg",
  },
];

const Claim = () => {
  return (
    <div className="bg-[#F2FBF7] w-full py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-black gap-8 sm:gap-12">
      <div className="space-y-4 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 border-green-500 border rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <Sparkle className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Gifting Made Simple</span>
        </div>
        <h2 className="text-center text-lg sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-6xl font-semibold">
          <span className="block">Find the Perfect Gift</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-5 w-full max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${item.image})` }}
            className={`bg-cover bg-center aspect-[4/3] w-full h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg`}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent to-black/70 rounded-lg flex items-end p-3 sm:p-4">
              <h3 className="text-white text-sm sm:text-base lg:text-lg font-semibold">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Claim;
