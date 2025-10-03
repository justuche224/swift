import GiftItem from "@/components/public/gifts/gift-item";

const page = async ({ params }: { params: Promise<{ giftID: string }> }) => {
  const { giftID } = await params;
  return (
    <div>
      <GiftItem giftID={giftID} />
    </div>
  );
};

export default page;
