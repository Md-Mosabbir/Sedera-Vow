import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <header className="w-full h-28 bg-blue-600 mb-4 flex justify-between items-center">
      <nav>
        <ul className="flex gap-10 mx-4 text-xl text-white">
          <Link to={"/products"}>
            <li>Products</li>
          </Link>
          <Link to={"/orders"}>
            <li>Orders</li>
          </Link>
          <Link to={"/"}>
            <li>Sales</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
