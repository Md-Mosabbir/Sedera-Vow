"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface RatingsReviewsCardProps {
  averageRating: number;
  numberOfReviews: number;
}

export function RatingsReviewsCard({
  averageRating,
  numberOfReviews,
}: RatingsReviewsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Ratings & Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Average Rating
            </Label>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{averageRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= averageRating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </Label>
            <p className="text-lg font-semibold">{numberOfReviews}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
