"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

interface ProductImageCardProps {
  imageUrl: string;
  productName: string;
}

export function ProductImageCard({
  imageUrl,
  productName,
}: ProductImageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Product Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={productName}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
