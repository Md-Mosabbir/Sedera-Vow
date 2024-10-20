import { Route, Routes } from "react-router-dom"
import Root from "./pages/Root"
import Sales from "./pages/Sales"
import Products from "./pages/Products"
import SingleProduct from "./pages/SingleProduct"

import SignIn from "./pages/SignIn"
import Authenticator from "./pages/Authenticator"
import UpdateProduct from "./pages/UpdateProduct"
import AddProduct from "./pages/AddProduct"
import Orders from "./pages/Orders"
import SingleOrder from "./pages/SingleOrder"

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticator>
              <Root />
            </Authenticator>
          }
        >
          <Route index element={<Sales />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="/create-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<SingleOrder />} />
        </Route>

        <Route path="/auth" element={<SignIn />} />
      </Routes>
    </>
  )
}
