"use client";

import { getGiftById, getRelatedGifts } from "@/actions/public";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Image from "next/image";
import formatPrice from "@/lib/price-formatter";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GiftTile } from "@/components/public/gifts/hero";
import Testimonials from "@/components/public/home/testimonials";
import CTA from "@/components/public/home/cta";
import AddToCart from "@/components/cart-button";

const GiftItem = ({ giftID }: { giftID: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gifts", giftID],
    queryFn: () => {
      return getGiftById(giftID);
    },
  });

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (isLoading)
    return (
      <div className="min-h-svh bg-black text-white container mx-auto py-10 px-5 grid place-items-center mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          <div className="w-full h-full space-y-4">
            <div className="w-full rounded-xl overflow-hidden border border-white/10">
              <Skeleton className="w-full h-[360px] md:h-[520px]" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>
          </div>
          <div className="w-full h-full space-y-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-9 w-2/3" />
              <Skeleton className="h-7 w-24" />
              <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-9 w-28 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-6 w-28" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (error && error instanceof Error)
    return (
      <div className="min-h-svh bg-black text-white container mx-auto py-10 px-5 grid place-items-center mt-16">
        <p>Failed to fetch gift</p>
      </div>
    );
  const images = data?.images || [];
  const mainImage =
    images[activeImageIndex] ||
    "/images/d4d6568e0e98e17af805e007f8e80712ff2de821.jpg";
  const availableSizes = data?.sizes || [];

  return (
    <>
      <div className="min-h-svh bg-black text-white container mx-auto py-10 px-5 grid place-items-center mt-16">
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <div className="w-full h-full space-y-4">
              <div className="w-full rounded-xl overflow-hidden border border-green-500/40">
                <Image
                  src={mainImage}
                  alt={data.name || ""}
                  width={900}
                  height={700}
                  className="w-full h-[360px] md:h-[520px] object-cover border-t-8 border-green-500"
                />
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`rounded-lg overflow-hidden border ${
                        idx === activeImageIndex
                          ? "border-green-500"
                          : "border-white/10"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${data.name} ${idx + 1}`}
                        width={200}
                        height={160}
                        className="w-full h-28 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full h-full space-y-6">
              <div className="px-3 py-1.5 rounded-full border border-green-500/60 text-green-400 w-fit text-xs uppercase tracking-wide">
                {data.category}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-semibold">
                  {data.name}
                </h1>
                <p className="text-2xl text-green-400">
                  {formatPrice(Number(data.price))}
                </p>
                {availableSizes.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Select options
                  </p>
                )}
                <div className="flex items-center gap-3">
                  {availableSizes.length > 0 && (
                    <Select
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                    >
                      <SelectTrigger className="min-w-28 bg-green-500/10 text-white border-0">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              <AddToCart
                product={{
                  id: data.id,
                  name: data.name,
                  price: Number(data.price),
                  images: data.images.map((url) => ({ url })),
                  description: data.description,
                }}
                selectedSize={selectedSize || undefined}
              />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger>Description & Fit</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {data.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Discount
                        </p>
                        <p className="text-sm">50%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Estimated Arrival
                        </p>
                        <p className="text-sm">5th October, 2025</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Warranty
                        </p>
                        <p className="text-sm">3 Months</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ) : (
          <div>Gift not found</div>
        )}
      </div>
      <Testimonials />
      <div className="bg-black text-white container mx-auto py-10 px-5">
        {data && (
          <RelatedSection giftId={data.id} category={data.category || ""} />
        )}
      </div>
      <CTA />
    </>
  );
};

export default GiftItem;

const RelatedSection = ({
  giftId,
  category,
}: {
  giftId: string;
  category: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["related", giftId, category],
    queryFn: () => getRelatedGifts(category, giftId, 6),
  });

  if (!category) return null;

  return (
    <div className="w-full mt-16">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
        You may also like
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 animate-pulse">
              <div className="w-full aspect-square rounded-xl border-t-8 border-green-500 bg-gray-700"></div>
              <div className="h-6 bg-gray-700 rounded"></div>
              <div className="h-5 bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {data?.map((g) => (
            <GiftTile
              key={g.id}
              id={g.id}
              images={g.images}
              name={g.name}
              price={g.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};
