"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function ProductHeader({}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Product Management</h1>
        <p className="text-muted-foreground">
          Manage product details and settings
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
