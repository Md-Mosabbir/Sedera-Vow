import { z } from "zod"

export const product = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  price: z
    .number()
    .nonnegative({ message: "Price must be a non-negative number" }),
  image: z
    .instanceof(FileList)
    .optional()
    .refine((fileList) => fileList.length === 1, {
      message: "Please upload one image",
    }) // Ensure only one file
    .transform((fileList) => fileList.item(0) ?? null) // Convert to File or null
    .nullable(), // Allow null (no file selected)
  description: z.string().min(1, { message: "Description cannot be empty" }),

  category: z.string().min(1, { message: "Category cannot be empty" }),
  numberInStock: z
    .number()
    .nonnegative({ message: "Number in stock must be a non-negative number" }),
  tier: z.string().min(1, { message: "Tier cannot be empty" }),
})
