"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Gift Catalog",
      href: "/gift-catalog",
      active: pathname === "/gift-catalog",
    },
    {
      label: "Testimonial",
      href: "/#testimonials",
      active: pathname === "/#testimonials",
    },
    {
      label: "Contact Us",
      href: "/contact",
      active: pathname === "/contact",
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="px-4 sm:px-8 fixed top-4 left-0 right-0 z-50">
      <nav className="flex justify-between items-center w-full px-2 py-1 bg-black rounded-full text-white">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-6 h-6"
          />
          <span className="text-2xl font-bold">Swift</span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <div className="flex gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant="link"
                  asChild
                  className={cn(
                    "text-muted-foreground hover:text-white",
                    item.active && "text-white"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
            <div>
              <Button className="rounded-full bg-green-500 text-black px-6 py-2 text-lg font-semibold hover:bg-green-600">
                Send a Package
              </Button>
            </div>
          </>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex flex-col p-4 space-y-3">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant="link"
                asChild
                className={cn(
                  "text-muted-foreground hover:text-white justify-start",
                  item.active && "text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <div className="pt-2 border-t border-gray-800">
              <Button
                className="w-full rounded-full bg-green-500 text-black py-3 text-lg font-semibold hover:bg-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Send a Package
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
