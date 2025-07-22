"use client";
import { Product } from "@/types/Product";
import { columns } from "./column";
import { DataTable } from "../../components/data-table";

const Data = ({ products }: { products: Product[] }) => {
  return <DataTable data={products} columns={columns} />;
};

export default Data;
