import { Link } from "react-router-dom"
import { Product } from "../types/Product"
import Featured from "./Featured"

const Items = ({
  _id,
  name,
  averageRating,
  imageUrl,
  tier,
  category,
  numberInStock,
  price,
  featured,
}: Product) => {
  return (
    <article
      className="w-full rounded-lg min-h-8 flex gap-10 items-center border p-3 text-white font-medium"
      id={_id}
    >
      <div>
        <div className="w-40">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        <p className="mt-2">Average Rating: {averageRating}</p>
      </div>
      <div>
        <div>
          <Link to={`/product/${_id}`}>
            <h1 className="font-extrabold text-2xl underline hover:text-violet-400">
              {name}
            </h1>
          </Link>
          <span className="mr-7">Tier: {tier}</span>

          <span>Category: {category}</span>
        </div>
        <div className=" text-lg mt-4">
          <span className="mr-7">Stock: {numberInStock}</span>
          <span>Price: ${price}</span>
        </div>
      </div>
      <Featured isFeatured={featured} id={_id} />
    </article>
  )
}

export default Items
