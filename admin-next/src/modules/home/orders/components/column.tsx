"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderStatus } from "@/types/Orders";

const getOrderStatusVariant = (status: OrderStatus): "default" | "secondary" | "destructive" => {
  switch (status) {
    case "Processing":
      return "secondary";
    case "Shipped":
      return "default";
    case "Delivered":
      return "default";
    case "Cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("_id")}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => {
      const status: OrderStatus = row.getValue("orderStatus");
      return (
        <div className="flex items-center">
          <Badge variant={getOrderStatusVariant(status)}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("paymentMethod")}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Contact",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("phoneNumber")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="font-medium">{date.toLocaleDateString()}</div>;
    },
  },
];
