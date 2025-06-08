"use client";

import { ColumnDef } from "@tanstack/react-table";

type Product = {
  name: string;
  category: string;
  inStock: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "inStock",
    header: "Stock",
  },
];
