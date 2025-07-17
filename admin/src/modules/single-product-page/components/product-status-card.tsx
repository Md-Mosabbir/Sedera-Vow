"use client";

import { toggleFeatured } from "@/app/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Package } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";


interface ProductStatusCardProps {
  featured: boolean;
  productId: string;
}

export function ProductStatusCard({
  featured,
  productId,
}: ProductStatusCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleToggle = () => {

    startTransition(() => {
      toggleFeatured(productId)
        .then(() => router.refresh())
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Product Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Featured Product</Label>
              <Switch
                checked={featured}
                onCheckedChange={handleToggle}
                disabled={isPending}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Featured products appear prominently on the homepage
            </p>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Product ID
          </Label>
          <p className="text-xs font-mono bg-muted p-2 rounded">{productId}</p>
        </div>
      </CardContent>
    </Card>
  );
}
