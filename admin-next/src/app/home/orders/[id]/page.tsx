import { getOrder } from "@/lib/data/orders";
import OrderTemplate from "@/modules/single-order";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  try {

    const { id } = await params
    const order = await getOrder(id);
    return (
      <OrderTemplate orderData={order} />
    );
  } catch (error) {
    notFound();
  }
}
