export function stringifyFilters(filters: Record<string, any>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(","));
    } else if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(typeof value === "number" && isNaN(value))
    ) {
      params.set(key, String(value));
    }
  }

  return `?${params.toString()}`;
}
