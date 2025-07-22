"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

type Product = {
  name: string;
  category: string;
  inStock: boolean;
  featured: boolean;
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

    cell: ({ row }) => {
      const stock: boolean = row.getValue("inStock");

      return (
        <div className="flex items-center">
          {stock ? (
            <Badge variant="default">In Stock</Badge>
          ) : (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      const isFeatured: boolean = row.getValue("featured");

      return (
        <div className="flex items-center gap-2">
          <Badge variant={isFeatured ? "default" : "secondary"}>
            {isFeatured ? "Featured" : "Not Featured"}
          </Badge>
        </div>
      );
    },
  },
];
