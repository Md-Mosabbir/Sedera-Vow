import { getOrders } from "@/lib/data/orders";
import DataTable from "@/modules/home/orders";
import React from "react";

const OrdersPage = async () => {
  const orders = await getOrders("");
  return <DataTable orders={orders} />;
};

export default OrdersPage;
