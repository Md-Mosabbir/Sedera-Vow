import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import OrderItems from "../components/OrderItems"
import { Order } from "../types/Order"
import { Link } from "react-router-dom"
import Pagination from "../components/Pagination"
import { useOrderParams } from "../hooks/useOrderParams"

const Orders = () => {
  const { params, updateParams, setLimit } = useOrderParams()

  const orders = useQuery({
    queryKey: ["admin", "orders", params],

    queryFn: async () => {
      const response = await axiosInstance.get("/admin/orders", {
        params,
        withCredentials: true,
      })

      return response.data
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholderData: (previousData, _previousQuery) => previousData,
  })
  const ordersData = orders.data

  if (orders.isLoading) return <div>Loading...</div>

  return (
    <div>
      <div>
        <Pagination
          totalPages={ordersData.totalPages}
          page={ordersData.page}
          updateParams={updateParams}
          setLimits={setLimit}
        />
      </div>
      {ordersData.orders.map((order: Order) => (
        <Link to={`/order/${order._id}`} key={order._id}>
          <OrderItems {...order} />
        </Link>
      ))}
    </div>
  )
}

export default Orders
