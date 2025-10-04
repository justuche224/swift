import { requireAdmin } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import GiftsPage from "./component";

const Admin = async () => {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    return redirect("/login?callbackUrl=/admin");
  }
  return <GiftsPage />;
};
export default Admin;
