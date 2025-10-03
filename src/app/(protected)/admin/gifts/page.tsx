import { getAllGifts } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { GiftActions } from "./gift-actions";
import Image from "next/image";

export default async function GiftsPage() {
  const gifts = await getAllGifts();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gift Management</h1>
          <p className="text-muted-foreground">Manage your gift catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/gifts/add">
            <IconPlus className="mr-2 h-4 w-4" />
            Add Gift
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gifts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-white">
                  No gifts found. Create your first gift to get started.
                </TableCell>
              </TableRow>
            ) : (
              gifts.map((gift) => (
                <TableRow className="text-white" key={gift.id}>
                  <TableCell>
                    {gift.imageUrls && gift.imageUrls.length > 0 ? (
                      <Image
                        src={gift.imageUrls[0]}
                        alt={gift.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                        <IconPlus className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{gift.name}</TableCell>
                  <TableCell>{gift.category}</TableCell>
                  <TableCell>₦{Number(gift.price).toLocaleString()}</TableCell>
                  <TableCell>{gift.stock}</TableCell>
                  <TableCell>
                    <Badge variant={gift.isActive ? "default" : "secondary"}>
                      {gift.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <GiftActions gift={gift} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
