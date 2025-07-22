"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/admin";
import { useTransition } from "react";

export function ProductHeader() {
  const path = usePathname(); // e.g., "/home/products/68416a7bf0a860c9edfe7db1"
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const productId = path.split("/").pop(); // ✅ Extract ID from path

  const handleDelete = () => {
    if (!productId) return;

    startTransition(async () => {
      try {
        await deleteProduct(productId);
        router.push("/home/products"); // ✅ redirect after delete
      } catch (err) {
        console.error("Deletion failed:", err);
        // optionally show toast or error UI
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Product Management</h1>
        <p className="text-muted-foreground">
          Manage product details and settings
        </p>
      </div>
      <div className="flex gap-2">
        <Link href={`${path}/edit`}>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
