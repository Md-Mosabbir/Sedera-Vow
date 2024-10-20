// Define Zod schema

import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import ProductForm from "../components/ProductForm"
import axiosInstance from "../utils/axiosInstance"
import { z } from "zod"
import { product } from "../types/productSchema"
export const UpdateProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const singleProduct = useQuery({
    queryKey: ["shop", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/shop/${id}`)

      return response.data
    },
  })

  const defaultValues: z.infer<typeof product> = {
    name: singleProduct.data.name,
    description: singleProduct.data.description,
    price: singleProduct.data.price,
    category: singleProduct.data.category,
    tier: singleProduct.data.tier,
    numberInStock: singleProduct.data.numberInStock,
    image: null,
  }

  // onSubmit function
  const updateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof product>) => {
      console.log("Data:", data)

      const response = await axiosInstance.put(
        `/admin/update-product/${id}`,
        data, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      )

      return response.data
    },

    onError: (error) => {
      console.error("Add product error:", error)
    },

    onSuccess: () => {
      console.log("Product added successfully")
      navigate("/products")
    },
  })

  if (singleProduct.isLoading) {
    return <div>Loading...</div>
  }
  console.log(defaultValues)

  return (
    <ProductForm
      defaultValues={defaultValues}
      onSubmit={updateMutation.mutate}
    />
  )
}

export default UpdateProduct
