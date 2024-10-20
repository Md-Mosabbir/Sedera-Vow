import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const NUM_ORDERS_PER_PAGE = 10

export const useOrderParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    sortBy: "createdAt",
    status: "",
    order: "desc",
  })

  const page = parseInt(searchParams.get("page") || "1")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const status = searchParams.get("status") || ""
  const order = searchParams.get("order") || "desc"

  const [limit, setLimit] = useState(NUM_ORDERS_PER_PAGE)

  // updateParams function
  const updateParams = (param: string, value: string) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        if (param !== "page") {
          newParams.set("page", "1")
        }
        newParams.set(param, value)
        return newParams
      },
      {
        replace: true,
      },
    )
  }

  const deleteFIlters = () => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.delete("status")
        newParams.delete("sortBy")
        newParams.delete("order")
        return newParams
      },
      {
        replace: true,
      },
    )
  }

  const params = {
    page,
    sortBy,
    status,
    order,
    limit,
  }

  return { params, updateParams, deleteFIlters, setLimit }
}
