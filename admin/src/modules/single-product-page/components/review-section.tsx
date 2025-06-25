"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users } from "lucide-react";
import { Review, ReviewUser } from "@/types/Product";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  function isReviewUser(user: string | ReviewUser): user is ReviewUser {
    return typeof user === "object" && user !== null && "username" in user;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Customer Reviews ({reviews.length})
        </CardTitle>
        <CardDescription>Recent customer feedback and ratings</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {isReviewUser(review.user) ? (
                    <>
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={review.user.profilePicture || "/placeholder.svg"}
                          alt={review.user.username}
                        />
                        <AvatarFallback>
                          {review.user.username?.charAt(0).toUpperCase() ?? "S"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {review.user.username}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review.createdAt}
                            </p>
                          </div>
                          {review.rating && (
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating!
                                      ? "fill-primary text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm italic text-muted-foreground">
                            Deleted user
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.createdAt}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No reviews yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
