import GiftItem from "@/components/public/gifts/gift-item";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ giftID: string }> }) => {
  const { giftID } = await params;
  
  const user = await serverAuth();

  if (!user) {
    return redirect("/login?callbackUrl=/gift-catalog/" + giftID);
  }
  return (
    <div>
      <GiftItem giftID={giftID} />
    </div>
  );
};

export default page;
