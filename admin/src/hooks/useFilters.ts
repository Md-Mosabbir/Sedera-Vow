import { parseFilters } from "@/utils/parseFilters";
import { stringifyFilters } from "@/utils/stringifyFilters";
import { useRouter } from "next/router";

export function useFilters(schema: Record<string, any>) {
  const router = useRouter();
  const currentParams = new URLSearchParams(router.asPath.split("?")[1]);
  const filters = parseFilters(currentParams, schema);

  const setFilters = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };

    // If value is invalid (e.g. empty string, null), remove the key
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete updatedFilters[key];
    }

    const queryString = stringifyFilters(updatedFilters);
    router.push(queryString);
  };

  return { filters, setFilters };
}
