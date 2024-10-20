// utils/salesAggregation.js
import mongoose from "mongoose"

export const buildSalesPipeline = (productId, period, startDate, endDate) => {
  let start, end
  const now = new Date()

  // Determine the date range based on the query parameters
  switch (period) {
    case "daily":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      end = now
      break
    case "weekly":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      end = now
      break
    case "monthly":
      start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      end = now
      break
    case "quarterly":
      start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      end = now
      break
    case "yearly":
      start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      end = now
      break
    case "range":
      if (!startDate || !endDate) {
        throw new Error(
          "Please provide both startDate and endDate for range query.",
        )
      }
      start = new Date(startDate)
      end = new Date(endDate)
      break
    default:
      throw new Error(
        'Invalid period. Please use "daily", "weekly", "monthly", "quarterly", "yearly", or "range".',
      )
  }

  // Build aggregation pipeline
  const pipeline = [
    {
      $match: {
        ...(productId && { product: mongoose.Types.ObjectId(productId) }),
        date: { $gte: start, $lte: end },
        status: "Delivered", // Assuming you have a status field
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$revenue" },
        totalProductsSold: { $sum: "$quantity" },
        count: { $sum: 1 },
      },
    },
  ]

  return {
    startDate: start,
    endDate: end,
    pipeline,
  }
}
