export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  numberInStock: number;
  averageRating: number;
  numberOfReviews: number;
  tier: string;
  featured: boolean;
  reviews: Review[];
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
}

export interface Review {
  user: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  rating: number;
  comment: string;
  _id: string;
  createdAt: string; // or Date
}
