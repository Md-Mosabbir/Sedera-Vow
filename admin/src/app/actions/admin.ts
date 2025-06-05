"use server";

import { cookies } from "next/headers";

export async function createProduct(formData: FormData) {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token"); // Get your auth cookie

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/create-product`,
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
