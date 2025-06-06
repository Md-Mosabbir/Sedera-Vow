import { getProducts } from "@/lib/data/products";
import { productFilterSchema } from "@/types/config/filters";
import { parseFilters } from "@/utils/parseFilters";
import { stringifyFilters } from "@/utils/stringifyFilters";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ShopPage({ searchParams }: Props) {
  // Convert searchParams to URLSearchParams
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else if (value) {
      params.set(key, value);
    }
  }

  const filters = parseFilters(params, productFilterSchema);
  const queryString = stringifyFilters(filters);
  const products = await getProducts(queryString);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      {JSON.stringify(products, null, 2)}
    </main>
  );
}
