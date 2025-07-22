export interface ReviewUser {
  _id: string;
  username?: string;
  profilePicture?: string;
}

export interface Review {
  user: string | ReviewUser;
  rating: number | null;
  comment: string;
  _id: string;
  createdAt: string;
}

export type ProductTier = "Gold" | "Diamond" | "Platinum";
export type ProductCategory = "Rings" | "Necklace" | "Pendant";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  inStock: boolean;
  numberInStock: number;
  averageRating: number;
  numberOfReviews: number;
  tier: ProductTier;
  featured: boolean;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductsResponse {
  products: Product[];
  page: number;
  totalResults: number;
  limit: number;
  totalPages: number;
}

export type ProductFilterParams = {
  search?: string;
  tiers?: ProductTier[];
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: string | boolean;
  sort?: string;
  order?: 1 | -1;
  page?: number;
  limit?: number;
};
