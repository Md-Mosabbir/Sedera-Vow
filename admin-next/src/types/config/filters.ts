export const productFilterSchema = {
  search: { type: "string", default: "" },
  page: { type: "number", default: 1 },
  limit: { type: "number", default: 10 },
  tiers: { type: "array", default: [] },
  category: { type: "string", default: "" },
  minPrice: { type: "number", default: 0 },
  maxPrice: { type: "number", default: Infinity },
  inStock: { type: "boolean", default: false },
  sort: { type: "string", default: "createdAt" },
  order: { type: "number", default: -1 },
};

export const orderFilterSchema = {
  page: { type: "number", default: 1 },
  limit: { type: "number", default: 10 },
  status: { type: "string", default: "" },

  // Newly added filters
  paymentMethod: { type: "string", default: "" },
  phoneNumber: { type: "string", default: "" },
  user: { type: "string", default: "" },
  minPrice: { type: "number", default: 0 },
  maxPrice: { type: "number", default: 0 },
  startDate: { type: "string", default: "" }, // ISO format recommended
  endDate: { type: "string", default: "" },
  sort: { type: "string", default: "createdAt" },
  order: { type: "number", default: -1 },
};
