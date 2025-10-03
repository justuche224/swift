import AdminDashboard from "@/app/(protected)/admin/component";
import {requireAdmin} from "@/lib/server-auth";
import { redirect } from "next/navigation";

const Admin = async () => {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
        return  redirect("/login");
    }
    return (
        <AdminDashboard/>
    )
}
export default Admin