"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface TimestampsCardProps {
  createdAt: string;
  updatedAt: string;
}

export function TimestampsCard({ createdAt, updatedAt }: TimestampsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timestamps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Created
          </Label>
          <p className="text-sm">{createdAt}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Last Updated
          </Label>
          <p className="text-sm">{updatedAt}</p>
        </div>
      </CardContent>
    </Card>
  );
}
