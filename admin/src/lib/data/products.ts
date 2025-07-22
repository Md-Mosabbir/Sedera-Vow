"use server";

import { Product, ProductsResponse } from "@/types/Product";
import { cookies } from "next/headers";

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
export const getAdminProducts = async (
  queryString: string = "",
): Promise<ProductsResponse> => {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/products/${queryString}`,
      {
        next: { revalidate: 60 },
        headers: {
          // Forward the cookie header manually
          Cookie: tokenCookie ? `token=${tokenCookie.value}` : "",
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch Orders: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Orders:", error);
    throw new Error("An error occurred while fetching Orders");
  }
};
export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/shop/${id}`,
    {
      cache: "no-store"
    },
  );

  return res.json();
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${process.env.SEDERA_BASE_URL}/shop/featured`, {
      //next: { revalidate: 60 },
      cache: "no-store"
    });

    return res.json();
  } catch (error: any) {
    throw new Error("error ", error);
  }
};
