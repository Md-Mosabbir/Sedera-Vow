"use server";

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

export async function setFeatured(id: string) {
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
