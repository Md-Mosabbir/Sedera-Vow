"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface PricingStockCardProps {
  price: number;
  inStock: boolean;
  numberInStock: number;
}

export function PricingStockCard({
  price,
  inStock,
  numberInStock,
}: PricingStockCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Pricing & Stock
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Price
          </Label>
          <p className="text-2xl font-bold">${price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              In Stock
            </Label>
            <p className="text-sm">{inStock ? "Yes" : "No"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Quantity
            </Label>
            <p className="text-sm font-semibold">{numberInStock} units</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
