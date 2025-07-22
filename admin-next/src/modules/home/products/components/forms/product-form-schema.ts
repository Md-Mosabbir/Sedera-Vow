import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function getFormSchema(isEditMode: boolean) {
  const baseSchema = {
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    price: z.coerce.number().min(0.01).max(999999.99),
    category: z.enum(["Rings", "Necklace", "Pendant"]),
    numberInStock: z.coerce.number().min(0).max(999999),
    tier: z.enum(["Gold", "Diamond", "Platinum"]),
    featured: z.boolean(),
    inStock: z.boolean(),
  };

  const imageSchema = isEditMode
    ? z
        .any()
        .optional()
        .refine(
          (files) => !files || files.length === 1,
          "Only one image file is allowed if provided.",
        )
        .refine(
          (files) => !files || files[0].size <= MAX_FILE_SIZE,
          "Max file size is 5MB.",
        )
        .refine(
          (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
          ".jpg, .jpeg, .png and .webp files are accepted.",
        )
    : z
        .any()
        .refine((files) => files?.length === 1, "Image is required.")
        .refine(
          (files) => files[0].size <= MAX_FILE_SIZE,
          "Max file size is 5MB.",
        )
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
          ".jpg, .jpeg, .png and .webp files are accepted.",
        );

  return z.object({
    ...baseSchema,
    image: imageSchema,
  });
}
