import { getOrder } from "@/lib/data/orders";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  try {
    const order = await getOrder(params.id);

    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Order #{order._id}</h1>
        <div className="grid gap-4">
          <div>
            <h2 className="font-semibold">Status</h2>
            <p>{order.orderStatus}</p>
          </div>
          <div>
            <h2 className="font-semibold">Items</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex gap-2">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold">Shipping Address</h2>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
