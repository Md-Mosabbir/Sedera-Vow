"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";

interface BasicInfoCardProps {
  name: string;
  description: string;
  category: string;
  tier: string;
}

export function BasicInfoCard({
  name,
  description,
  category,
  tier,
}: BasicInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Product Name
          </Label>
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Description
          </Label>
          <p className="text-sm">{description}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Category
          </Label>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Tier
          </Label>
          <Badge variant="outline">{tier}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
