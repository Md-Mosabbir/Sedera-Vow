"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export async function createProduct(formData: FormData) {
  // Get your auth cookie
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/product`,
    {
      method: "POST",
      headers: {
        // Forward the cookie header manually
        Cookie: tokenCookie ? `token=${tokenCookie.value}` : "",
      },
      body: formData,
    },
  );

  return res.json();
}

export async function updateProduct(formData: FormData, id: string) {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/product/${id}`,
    {
      method: "PUT",

      headers: {
        // Forward the cookie header manually
        Cookie: tokenCookie ? `token=${tokenCookie.value}` : "",
      },
      body: formData,
    },
  );

  return res.json();
}



export async function deleteProduct(id: string) {
  try {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/product/${id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: tokenCookie ? `token=${tokenCookie.value}` : "",
        },
      }
    );

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || "Failed to delete product");
      } else {
        const text = await res.text();
        throw new Error(`Unexpected response: ${text}`);
      }
    }

    return res.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}


export async function toggleFeatured(id: string) {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/product/${id}/featured`,
    {
      method: "PUT",
      headers: {
        Cookie: tokenCookie ? `token=${tokenCookie.value}` : "",
      },
    },
  );
  return res.json();
}


const updateOrderStatus = async (id: string, action: string) => {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/order/${id}/${action}`,
    {
      method: "PUT",
      headers: {
        Cookie: tokenCookie ? `token=${tokenCookie.value}` : "",
      },
    },
  );

  const data = await res.json();

  revalidatePath(`/home/orders/${id}`);

  return data;
};

// Then export wrapped versions:
export const cancelOrder = async (id: string) => updateOrderStatus(id, "cancel");
export const shipOrder = async (id: string) => updateOrderStatus(id, "ship");
export const deliverOrder = async (id: string) => updateOrderStatus(id, "deliver");
export const processOrder = async (id: string) => updateOrderStatus(id, "process");

