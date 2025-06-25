"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Package } from "lucide-react";

interface ProductStatusCardProps {
  featured: boolean;
  productId: string;
  featuredDialogOpen: boolean;
  setFeaturedDialogOpen: (open: boolean) => void;
  onFeaturedToggle: () => void;
}

export function ProductStatusCard({
  featured,
  productId,
  //   featuredDialogOpen,
  //   setFeaturedDialogOpen,
  //   onFeaturedToggle,
}: ProductStatusCardProps) {
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
            <Label className="text-sm font-medium">Featured Product</Label>
            <p className="text-xs text-muted-foreground">
              Featured products appear prominently on the homepage
            </p>
          </div>
          {/* <AlertDialog
            open={featuredDialogOpen}
            onOpenChange={setFeaturedDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Switch checked={featured} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {featured ? "Remove from Featured" : "Add to Featured"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {featured
                    ? "This product will no longer be featured on the homepage."
                    : "This product will be prominently displayed on the homepage."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onFeaturedToggle}>
                  {featured ? "Remove Featured" : "Make Featured"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
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
