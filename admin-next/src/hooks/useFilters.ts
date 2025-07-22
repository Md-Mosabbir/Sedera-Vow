import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { parseFilters } from "@/utils/parseFilters";

export function useFilters(schema: Record<string, any>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = parseFilters(searchParams, schema);

  const setFilters = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };

    // If value is invalid, remove the key
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete updatedFilters[key];
    }

    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return { filters, setFilters };
}
