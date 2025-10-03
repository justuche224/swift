"use client";

import { createGift, updateGift, type Gift } from "@/actions/admin";
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

const MAX_IMAGES = 3;

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
  const [imageUrls, setImageUrls] = useState<string[]>(gift?.imageUrls || []);
  const [sizes, setSizes] = useState<string[]>(gift?.sizes || []);
  const [sizeInput, setSizeInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_IMAGES - imageUrls.length;
    if (remainingSlots === 0) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    const invalidFiles = filesToUpload.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      toast.error("Please upload only image files");
      return;
    }

    if (filesToUpload.length < files.length) {
      toast.warning(
        `Only uploading ${filesToUpload.length} image(s) due to ${MAX_IMAGES} image limit`
      );
    }

    setIsUploading(true);
    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload/gift-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        return result.imageUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImageUrls([...imageUrls, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleAddSize = () => {
    const trimmedSize = sizeInput.trim();
    if (!trimmedSize) {
      toast.error("Please enter a size");
      return;
    }
    if (sizes.includes(trimmedSize)) {
      toast.error("Size already added");
      return;
    }
    setSizes([...sizes, trimmedSize]);
    setSizeInput("");
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
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
      imageUrls,
      sizes,
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
        <Label htmlFor="image">Gift Images (up to {MAX_IMAGES})</Label>
        <div className="flex flex-col gap-4">
          {imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-fit">
                  <Image
                    src={url}
                    alt={`Gift preview ${index + 1}`}
                    width={128}
                    height={128}
                    className="h-32 w-32 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <IconX className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {imageUrls.length < MAX_IMAGES && (
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                multiple
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
          Upload up to {MAX_IMAGES} images for the gift (max 4MB each)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sizes">Available Sizes (Optional)</Label>
        <div className="flex gap-2">
          <Input
            id="sizes"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            placeholder="e.g., S, M, L or 38, 39, 40"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSize();
              }
            }}
          />
          <Button type="button" onClick={handleAddSize} variant="outline">
            Add
          </Button>
        </div>
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-md"
              >
                <span>{size}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSize(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Add sizes for this gift (e.g., S, M, L for clothes or 38, 39, 40 for
          shoes). Press Enter or click Add.
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
