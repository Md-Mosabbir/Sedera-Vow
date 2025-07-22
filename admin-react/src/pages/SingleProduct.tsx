import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { Link, useParams } from "react-router-dom"
import Featured from "../components/Featured"
import ScrollArea from "../components/ScrollArea"

const SingleProduct = () => {
  const { id } = useParams()

  const product = useQuery({
    queryKey: ["shop", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/shop/${id}`)

      return response.data
    },
  })

  console.log(product)

  if (product.isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-3 text-white">
      <div className="w-96 my-2">
        <img
          src={product.data.imageUrl}
          alt={product.data.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">{product.data.name}</h1>
        <Featured id={product.data._id} isFeatured={product.data.featured} />
      </div>
      <p className="text-lg">{product.data.description}</p>
      <p className="text-lg font-extrabold">Price: ${product.data.price}</p>

      <p>
        <span className="font-extrabold">Category:</span>{" "}
        {product.data.category}
      </p>

      <p>
        <span className="font-extrabold">Tier:</span> {product.data.tier}
      </p>

      <p>
        <span className="font-extrabold">Stock:</span>{" "}
        {product.data.numberInStock}
      </p>

      <p>
        <span className="font-extrabold">Average Rating: </span>
        {product.data.averageRating}
      </p>

      <h2 className="text-xl font-bold">Comments and Rating </h2>
      <ScrollArea>
        {product.data?.reviews.map((review) => (
          <div key={review._id} className="border p-3 rounded-lg">
            <p>
              {" "}
              <span className="font-extrabold">Username:</span>{" "}
              {review.userId.username}
            </p>
            <p>
              {" "}
              <span className="font-extrabold">Comment:</span> {review.comment}
            </p>
            <p>
              {" "}
              <span className="font-extrabold">Rating:</span> {review.rating}
            </p>
          </div>
        ))}
      </ScrollArea>
      <Link to={`/update-product/${product.data._id}/`}>
        <button className="btn text-lg btn-primary w-full">Edit</button>
      </Link>

      <button className="btn text-lg btn-error ">Delete</button>
    </div>
  )
}

export default SingleProduct
