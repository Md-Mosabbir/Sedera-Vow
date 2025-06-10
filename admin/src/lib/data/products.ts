"use server";

import { Product, ProductsResponse } from "@/types/Product";

export const getProducts = async (
  queryString: string = "",
): Promise<ProductsResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/shop${queryString}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("An error occurred while fetching products");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${process.env.SEDERA_BASE_URL}/shop/${id}`, {
    next: { revalidate: 3600 },
  });

  return res.json();
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${process.env.SEDERA_BASE_URL}/shop/featured`, {
      next: { revalidate: 60 },
    });

    return res.json();
  } catch (error: any) {
    throw new Error("error ", error);
  }
};
