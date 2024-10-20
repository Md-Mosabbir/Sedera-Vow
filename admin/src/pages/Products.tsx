import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import Pagination from "../components/Pagination"
import Items from "../components/ProductItems"
import { Product } from "../types/Product"
import { Link } from "react-router-dom"

const Products = () => {
  const query = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const response = await axiosInstance.get("/shop")

      return response.data
    },
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <Pagination />
      </div>
      <Link to="/create-product">
        <button className="bg-green-500 p-3 rounded-lg my-4 text-white">
          Add Product
        </button>
      </Link>

      <div className="my-10 flex flex-col gap-7">
        {query.data.products.map((product: Product) => (
          <Items
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category}
            averageRating={product.averageRating}
            numberInStock={product.numberInStock}
            tier={product.tier}
            featured={product.featured}
          />
        ))}
      </div>
    </>
  )
}

export default Products
