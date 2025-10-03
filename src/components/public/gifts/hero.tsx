"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Testimonials from "../home/testimonials";
import { useQuery } from "@tanstack/react-query";
import { getAllGifts, searchGifts } from "@/actions/public";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import formatPrice from "@/lib/price-formatter";

export const GiftTile = ({
  id,
  images,
  name,
  price,
}: {
  id: string;
  images: string[] | null;
  name: string | null;
  price: string | number | null;
}) => {
  const displayImage =
    images && images.length > 0
      ? images[0]
      : "/images/d4d6568e0e98e17af805e007f8e80712ff2de821.jpg";

  return (
    <Link
      href={`/gift-catalog/${id}`}
      className="border-green-500 hover:border-2 rounded-xl hover:p-2 transition-all duration-300"
    >
      <div className="flex flex-col gap-2">
        <div
          style={{
            backgroundImage: `url('${displayImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full aspect-square rounded-xl border-t-8 border-green-500"
        ></div>
        <div className="flex flex-col gap-2">
          <p className="text-white font-bold text-3xl line-clamp-2">{name}</p>
          <p className="text-green-500 font-semibold text-xl">
            {formatPrice(Number(price || 0))}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Hero = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["gifts", currentPage, searchQuery],
    queryFn: () => {
      if (searchQuery.trim()) {
        return searchGifts(searchQuery, currentPage, 12);
      }
      return getAllGifts(currentPage, 12);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="min-h-screen">
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
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <Input
            placeholder="Search for a gift"
            className="bg-white text-black"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" className="bg-green-500 text-black">
            Search <Search className="w-4 h-4" />
          </Button>
        </form>
        <Button>
          Sort by <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="w-full bg-black p-5 container mx-auto">
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 animate-pulse">
                <div className="w-full aspect-square rounded-xl border-t-8 border-green-500 bg-gray-700"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-8 bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-white py-8">
            <p>Error loading gifts. Please try again later.</p>
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
              {data.gifts.map((gift) => (
                <GiftTile
                  key={gift.id}
                  id={gift.id}
                  images={gift.images}
                  name={gift.name}
                  price={gift.price}
                />
              ))}
            </div>

            {data.pagination.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: data.pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage >= data.pagination.totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
      <Testimonials />
    </div>
  );
};

export default Hero;
