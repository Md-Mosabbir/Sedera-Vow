import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const DEFAULT_LIMIT = 10

type UseParamsOptions = {
  initialPage?: string
  initialSortBy?: string
  initialStatus?: string
  initialOrder?: string
  defaultLimit?: number
  allowedFilters?: string[]
}

export const useDynamicParams = ({
  initialPage = "1",
  initialSortBy = "createdAt",
  initialOrder = "desc",
  defaultLimit = DEFAULT_LIMIT,
  allowedFilters = ["page", "sortBy", "status", "order"],
}: UseParamsOptions) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: initialPage,
    sortBy: initialSortBy,

    order: initialOrder,
  })

  const filters = allowedFilters.reduce(
    (acc, filter) => {
      acc[filter] = searchParams.get(filter) || ""
      return acc
    },
    {} as Record<string, string>,
  )

  const page = parseInt(filters.page) || 1
  const [limit, setLimit] = useState(defaultLimit)

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
      { replace: true },
    )
  }

  const deleteFilters = () => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        allowedFilters.forEach((filter) => newParams.delete(filter))
        return newParams
      },
      { replace: true },
    )
  }

  const params = {
    ...filters,
    page,
    limit,
  }

  return { params, updateParams, deleteFilters, setLimit }
}
