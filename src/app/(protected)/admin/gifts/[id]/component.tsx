import {getGiftById} from "@/actions/admin";
import {GiftForm} from "../gift-form";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {IconArrowLeft} from "@tabler/icons-react";
import {notFound} from "next/navigation";

export default async function EditGiftPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const gift = await getGiftById(id);

    if (!gift) {
        notFound();
    }

    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/gifts">
                        <IconArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Gifts
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">Edit Gift</h1>
                <p className="text-muted-foreground">
                    Update the details for {gift.name}
                </p>
            </div>

            <GiftForm gift={gift}/>
        </div>
    );
}
