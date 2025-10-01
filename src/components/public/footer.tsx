import React from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-black text-white px-4 sm:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 container mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-[10px]">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="w-6 h-6"
            />
            <span className="text-xl sm:text-2xl font-bold">Swift</span>
          </div>
          <p className="text-muted text-sm sm:text-base">
            Delivering gifts to your loved ones abroad.
          </p>
          <Image
            src={"/images/9b4d29251337cdee85ca2d7ced2c5c5bf18e4a78.png"}
            alt="qr-code"
            width={200}
            height={200}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Shop</h3>
          <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
            <li>All Products</li>
            <li>Featured Items</li>
            <li>New Arrivals</li>
            <li>On Sale</li>
            <li>Best Sellers</li>
            <li>Gift Cards</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Customer Service</h3>
          <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping Policy</li>
            <li>Returns & Refunds</li>
            <li>Track Your Order</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Newsletter</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Subscribe to get special offers, free giveaways and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <Input
              placeholder="Enter your email"
              className="bg-white text-black flex-1"
            />
            <Button className="bg-green-500 text-white hover:bg-green-600 px-3 sm:px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
