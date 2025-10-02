"use client";

import {
  createGift,
  updateGift,
  uploadGiftImage,
  type Gift,
} from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Media",
  "Food & Beverages",
  "Other",
];

interface GiftFormProps {
  gift?: Gift;
}

export function GiftForm({ gift }: GiftFormProps) {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(
    gift?.imageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadGiftImage(formData);
      setImageUrl(result.imageUrl);
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string),
      imageUrl: imageUrl || null,
      isActive: formData.get("isActive") === "on",
    };

    startTransition(async () => {
      try {
        if (gift) {
          await updateGift(gift.id, data);
          toast.success("Gift updated successfully");
        } else {
          await createGift(data);
          toast.success("Gift created successfully");
        }
        router.push("/admin/gifts");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error(gift ? "Failed to update gift" : "Failed to create gift");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="space-y-2">
        <Label htmlFor="name">Gift Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter gift name"
          defaultValue={gift?.name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter gift description"
          defaultValue={gift?.description}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₦)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            defaultValue={gift?.price ? Number(gift.price) : undefined}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            placeholder="0"
            defaultValue={gift?.stock}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={gift?.category || ""} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Gift Image</Label>
        <div className="flex flex-col gap-4">
          {imageUrl ? (
            <div className="relative w-fit">
              <Image
                src={imageUrl}
                alt="Gift preview"
                width={128}
                height={128}
                className="h-32 w-32 object-cover rounded border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={() => setImageUrl(null)}
              >
                <IconX className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="cursor-pointer"
              />
              {isUploading && (
                <span className="text-sm text-muted-foreground">
                  Uploading...
                </span>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Upload an image for the gift (max 4MB)
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          name="isActive"
          defaultChecked={gift?.isActive ?? true}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isPending || isUploading}>
          {isPending ? "Saving..." : gift ? "Update Gift" : "Create Gift"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/gifts")}
          disabled={isPending || isUploading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
