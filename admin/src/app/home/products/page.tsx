import { parseFilters } from "@/utils/parseFilters";
import { stringifyFilters } from "@/utils/stringifyFilters";
import { productFilterSchema } from "@/types/config/filters";
import { getProducts } from "@/lib/data/products";
import DataTable from "@/modules/home/products";

export default async function Products({
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
  //TODO: set fetch product type
  const filters = parseFilters(params, productFilterSchema);
  const queryString = stringifyFilters(filters);
  const products = await getProducts(queryString);

  return <DataTable products={products} />;
}
