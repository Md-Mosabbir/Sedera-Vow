// Define Zod schema

import { useMutation } from "@tanstack/react-query"
import ProductForm from "../components/ProductForm"
import { z } from "zod"
import axiosInstance from "../utils/axiosInstance"
import { product } from "../types/productSchema"
import { useNavigate } from "react-router-dom"

export const AddProduct = () => {
  const navigate = useNavigate()
  const addMutation = useMutation({
    mutationFn: async (data: z.infer<typeof product>) => {
      const response = await axiosInstance.post("/admin/create-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      })

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

  return <ProductForm onSubmit={addMutation.mutate} />
}

export default AddProduct
