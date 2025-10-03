import { GiftForm } from "../gift-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function AddGiftPage() {
    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto text-white">
            <div className="space-y-2">
                <Button size="sm" asChild>
                    <Link href="/admin/gifts">
                        <IconArrowLeft className="mr-2 h-4 w-4" />
                        Back to Gifts
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">Add New Gift</h1>
                <p className="text-muted-foreground">
                    Create a new gift item for your catalog
                </p>
            </div>

            <GiftForm />
        </div>
    );
}
