export const parseFilters = (
  searchParams: URLSearchParams,
  schema: Record<string, any>,
) => {
  const filters: Record<string, any> = {};

  for (const key in schema) {
    const { type, default: defaultValue } = schema[key];
    const value = searchParams.get(key);

    if (value === null) {
      filters[key] = defaultValue;
      continue;
    }

    switch (type) {
      case "string":
        filters[key] = value;
        break;
      case "number":
        filters[key] = parseFloat(value);
        break;
      case "boolean":
        filters[key] = value === "true";
        break;
      case "array":
        filters[key] = value.split(",");
        break;
      default:
        filters[key] = value;
    }
  }

  return filters;
};
