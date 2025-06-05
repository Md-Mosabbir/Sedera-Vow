"use server";

import { Product } from "@/types/Product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${process.env.SEDERA_BASE_URL}/shop`, {
      next: { revalidate: 60 },
    });

    return res.json();
  } catch (error: any) {
    throw new Error("error ", error);
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
