import {requireAdmin} from "@/lib/server-auth";
import { redirect } from "next/navigation";
import AddGiftPage from "./component";

const AddGift = async ({params}: { params: Promise<{ id: string }> }) => {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
        return  redirect("/login");
    }
    return (
        <AddGiftPage params={params}/>
    )
}
export default AddGift