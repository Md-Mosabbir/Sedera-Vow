import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { product } from "../types/productSchema"

// Extract the type from the Zod schema
type ProductFormData = z.infer<typeof product>

// Define the component props type
type ProductFormProps = {
  defaultValues?: ProductFormData
  onSubmit: (data: ProductFormData) => void
}

const ProductForm = ({ defaultValues, onSubmit }: ProductFormProps) => {
  // Use the useForm hook with Zod resolver and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(product),
    defaultValues,
  })

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("name")}
            />
            <p className="text-red-300">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description: </label>
            <textarea
              placeholder="Type here"
              id="description"
              className="input input-bordered w-full max-w-xs"
              {...register("description")}
            />
            <p className="text-red-300">{errors.description?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            <p className="text-red-300">{errors.price?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category: </label>
            <input
              type="text"
              id="category"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("category")}
            />
            <p className="text-red-300">{errors.category?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="numberInStock">Number in Stock: </label>
            <input
              type="number"
              id="numberInStock"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("numberInStock", {
                valueAsNumber: true,
              })}
            />
            <p className="text-red-300">{errors.numberInStock?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tier">Tier: </label>
            <input
              type="text"
              id="tier"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("tier")}
            />
            <p className="text-red-300">{errors.tier?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-fit mb-3">
            <label>Image File:</label>
            <input
              type="file"
              {...register("image")}
              className="input input-bordered pt-2"
            />
            {errors.image && (
              <p className="text-red-300">{errors.image.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full max-w-xs">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
