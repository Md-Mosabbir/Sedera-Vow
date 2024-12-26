import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import OrderItems from "../components/OrderItems"
import { Order } from "../types/Order"
import { Link } from "react-router-dom"
import Pagination from "../components/Pagination"
import { useDynamicParams } from "../hooks/useDynamicParams"

const Orders = () => {
  const { params, updateParams, setLimit } = useDynamicParams({
    initialPage: "1",
    initialSortBy: "createdAt",
    initialOrder: "desc",
    defaultLimit: 10,
    allowedFilters: ["page", "sortBy", "order"],
  })

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
          setLimit={setLimit}
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
