"use client";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/users/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("Login failed");
}
