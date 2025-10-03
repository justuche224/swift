import {requireAdmin} from "@/lib/server-auth";
import { redirect } from "next/navigation";
import OrderDetailPage from "./component";

const Admin = async ({ params }: { params: Promise<{ id: string }> }) => {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
        return  redirect("/login");
    }
    return (
        <OrderDetailPage params={params}/>
    )
}
export default Admin