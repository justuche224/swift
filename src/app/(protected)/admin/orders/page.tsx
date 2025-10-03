import {requireAdmin} from "@/lib/server-auth";
import { redirect } from "next/navigation";
import OrdersPage from "./component";

const Admin = async () => {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
        return  redirect("/login");
    }
    return (
        <OrdersPage/>
    )
}
export default Admin