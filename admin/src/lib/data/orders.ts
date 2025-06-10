import { OrdersResponse } from "@/types/Orders";
import { cookies } from "next/headers";

export const getOrders = async (
  queryString: string = "",
): Promise<OrdersResponse> => {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEDERA_BASE_URL}/admin/orders/${queryString}`,
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
