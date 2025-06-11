import { getOrders } from "@/lib/data/orders";
import DataTable from "@/modules/home/orders";
import { orderFilterSchema } from "@/types/config/filters";
import { parseFilters } from "@/utils/parseFilters";
import { stringifyFilters } from "@/utils/stringifyFilters";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // First await the searchParams
  const resolvedParams = await Promise.resolve(searchParams);
  const params = new URLSearchParams();

  // Now safely use the resolved params
  for (const [key, value] of Object.entries(resolvedParams)) {
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else if (value) {
      params.set(key, value);
    }
  }

  const filters = parseFilters(params, orderFilterSchema);
  const queryString = stringifyFilters(filters);
  const orders = await getOrders(queryString);

  return <DataTable orders={orders} />;
}
