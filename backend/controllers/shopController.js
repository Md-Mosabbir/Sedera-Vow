import { check, validationResult } from "express-validator"
import Shop from "../models/Product.js"
import User from "../models/User.js"
import asyncHandler from "express-async-handler"

// @desc Get all products
// @route GET /shop
// @access Public

export const getProducts = asyncHandler(async (req, res) => {
  // Page limits
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const startIndex = (page - 1) * limit

  // Filter, Search, and Sort
  const search = req.query.search || ""
  const tiers = req.query.tiers ? req.query.tiers.split(",") : []
  const category = req.query.category || ""
  const minPrice = parseFloat(req.query.minPrice) || 0
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity
  const inStock = req.query.inStock === "true"

  const sort = req.query.sort || "createdAt"
  const order = req.query.order === "asc" ? 1 : -1

  const matchCondition = {}

  if (search) {
    matchCondition.name = {
      $regex: search,
      $options: "i",
    }
  }

  if (tiers.length > 0) {
    matchCondition.tier = {
      $in: tiers,
    }
  }

  if (category) {
    matchCondition.category = category
  }

  if (minPrice || maxPrice !== Infinity) {
    matchCondition.price = {
      $gte: minPrice,
      $lte: maxPrice,
    }
  }

  if (inStock) {
    matchCondition.inStock = inStock
  }

  const totalPipeline = [
    {
      $match: matchCondition,
    },
    {
      $count: "total",
    },
  ]

  const total = await Shop.aggregate(totalPipeline)

  const totalResults = total.length > 0 ? total[0].total : 0

  if (totalResults === 0) {
    return res.status(200).json({ products: [], message: "No products found" })
  }

  if (minPrice > maxPrice) {
    return res.status(400).json({ message: "Invalid price range" })
  }

  const productPipeline = [
    {
      $match: matchCondition,
    },
    {
      $sort: {
        [sort]: order,
      },
    },
    {
      $skip: startIndex,
    },
    {
      $limit: limit,
    },
  ]

  const products = await Shop.aggregate(productPipeline)
  const totalPages = Math.ceil(totalResults / limit)

  res.status(200).json({
    products,
    page,
    totalResults,
    limit,
    totalPages,
  })
})

// @desc Get single product
// @route GET /shop/:id
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Shop.findById(req.params.id).populate({
    path: "reviews.userId",
    select: "username", // Select only the 'name' field to include in the response
  })

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc Get featured products
// @route GET /shop/featured
// @access Public

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Shop.find({ featured: true })

    if (products.length > 0) {
      res.json(products)
    } else {
      res.status(404).json({ message: "No featured products found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc Post rating
// @route POST /shop/:id/rate
// @access Private

export const postRating = asyncHandler(async (req, res) => {
  // Find user in database

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(404).json({ message: "User not found" })
  }

  // Find product in database
  const product = await Shop.findById(req.params.id)

  if (!product) {
    res.status(404).json({ message: "Product not found" })
  }

  // Check using express validator
  // Check if rating is empty and between 1 and 5 and is an integer value
  await check("rating", "Rating is required")
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Check if rating is an integer
  if (!Number.isInteger(req.body.rating)) {
    console.log(req.body.rating)
  }

  // Integer rating
  const rating = req.body.rating

  // Find user's review
  const review = product.reviews.find(
    (review) => review.userId.toString() === req.user.id.toString(),
  )

  // If user has already reviewed the product

  if (review) {
    // Update rating
    product.averageRating =
      (product.averageRating * product.numberOfReviews -
        review.rating +
        rating) /
      product.numberOfReviews
    review.rating = rating
  } else {
    // Add new rating
    product.reviews.push({
      userId: req.user.id,
      rating,
    })

    product.numberOfReviews++
    product.averageRating =
      (product.averageRating * (product.numberOfReviews - 1) + rating) /
      product.numberOfReviews
  }

  await product.save()

  res.status(201).json({ message: "Rating added" })
})

export const getUserRating = asyncHandler(async (req, res) => {
  // Find user in database

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(404).json({ message: "User not found" })
  }

  // Find product in database
  const product = await Shop.findById(req.params.id)

  if (!product) {
    res.status(404).json({ message: "Product not found" })
  }

  // Find user's review
  const review = product.reviews.find(
    (review) => review.userId.toString() === req.user.id.toString(),
  )

  if (review) {
    res.json({ rating: review.rating })
  } else {
    res.status(404).json({ message: "Rating not found" })
  }
})
