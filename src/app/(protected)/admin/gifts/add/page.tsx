import { requireAdmin } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import AddGiftPage from "./component";

const AddGift = async () => {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    return redirect("/login?callbackUrl=/admin");
  }
  return <AddGiftPage />;
};
export default AddGift;
