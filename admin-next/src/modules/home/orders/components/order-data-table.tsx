"use client";
import { columns } from "./column";
import { DataTable } from "../../components/data-table";
import { Order } from "@/types/Orders";

const Data = ({ orders }: { orders: Order[] }) => {
  return <DataTable data={orders} columns={columns} />;
};

export default Data;
