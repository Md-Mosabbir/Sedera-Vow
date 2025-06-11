import asyncHandler from "express-async-handler"
import { check, validationResult } from "express-validator"
import Product from "../models/Product.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from "fs"
import Order from "../models/Order.js"
import Sales from "../models/Sales.js"
import { buildSalesPipeline } from "../utils/salesAggregate.js"

export const getAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Welcome to the admin route" })
})
// @desc Create a product
// @route POST /create-product
// @access Private/Admin

export const createProduct = asyncHandler(async (req, res) => {
  await check("name", "Name is required").not().isEmpty().run(req)
  await check("description", "Description is required").not().isEmpty().run(req)
  await check("price", "Price is required").not().isEmpty().run(req)
  await check("category", "Category is required").not().isEmpty().run(req)
  await check("numberInStock", "Number in stock is required")
    .not()
    .isEmpty()
    .run(req)
  await check("tier", "Tier is required").not().isEmpty().run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, description, price, category, numberInStock, tier } = req.body

  // Upload image to Cloudinary
  const localFilePath = req.file.path
  const uploadedImage = await uploadOnCloudinary(localFilePath)

  if (!uploadedImage) {
    return res.status(500).json({ message: "Image upload failed" })
  }

  // Remove the local file after uploading to Cloudinary
  fs.unlinkSync(localFilePath)

  const imageUrl = uploadedImage.url

  const product = new Product({
    name,
    description,
    price,
    category,
    imageUrl,
    numberInStock,
    tier,
  })

  const createdProduct = await product.save()

  res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /update-product/:id
// @access Private/Admin

export const updateProduct = asyncHandler(async (req, res) => {
  // Validate request body
  await check("name", "Name is required").not().isEmpty().run(req)
  await check("description", "Description is required").not().isEmpty().run(req)
  await check("price", "Price is required").not().isEmpty().run(req)
  await check("category", "Category is required").not().isEmpty().run(req)
  await check("numberInStock", "Number in stock is required")
    .not()
    .isEmpty()
    .run(req)
  await check("tier", "Tier is required").not().isEmpty().run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    name,
    description,
    price,
    category,
    numberInStock,
    tier,
    featured,
    inStock,
  } = req.body

  // Find the product by ID
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  // If a new image file is provided
  let imageUrl = product.imageUrl // Keep the existing image URL

  if (req.file) {
    // Upload the new image to Cloudinary
    const localFilePath = req.file.path
    const uploadedImage = await uploadOnCloudinary(localFilePath)

    if (!uploadedImage) {
      return res.status(500).json({ message: "Image upload failed" })
    }

    // Remove the local file after uploading to Cloudinary
    fs.unlinkSync(localFilePath)

    imageUrl = uploadedImage.url // Update the image URL
  }

  // Update the product details
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      category,
      numberInStock,
      tier,
      imageUrl,
      featured,
      inStock,
    },
    { new: true, runValidators: true },
  )

  res.status(200).json(updatedProduct)
})

// @desc Feature a product
// @route PUT /product/:id/feature
// @access Private/Admin

export const featureProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  product.featured = !product.featured

  await product.save()

  res.status(200).json(product)
})

// @desc Delete a product
// @route DELETE /delete-product/:id
// @access Private/Admin
// TODO:
export const deleteProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Delete a product function is under development" })
})

// ------------------ ORDERS ------------------ \\

// @desc Get all orders
// @route GET /admin/orders
// @access Private/Admin

export const getOrders = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "-1",
    status,
    paymentMethod,
    userId,
    productId,
    startDate,
    endDate,
    search,
  } = req.query

  const pageNumber = parseInt(page)
  const limitNumber = parseInt(limit)

  try {
    const matchStage = {}

    if (status) {
      matchStage.orderStatus = status
    }

    if (paymentMethod) {
      matchStage.paymentMethod = paymentMethod
    }

    if (userId) {
      matchStage.user = userId
    }

    if (productId) {
      matchStage["orderItems.productId"] = productId
    }

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    if (search) {
      matchStage["orderItems.name"] = {
        $regex: search,
        $options: "i",
      }
    }

    const pipeline = []

    // Match stage
    pipeline.push({ $match: matchStage })

    // Add totalAmount field if sorting by it
    if (sort === "totalAmount") {
      pipeline.push({
        $addFields: {
          totalAmount: { $sum: "$orderItems.subtotal" },
        },
      })
    }

    // Sort stage
    pipeline.push({
      $sort: {
        [sort]: order === "-1" ? -1 : 1,
      },
    })

    // Pagination stages
    pipeline.push(
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber },
    )

    const orderData = await Order.aggregate(pipeline)

    // Count total matching documents
    const totalOrders = await Order.countDocuments(matchStage)
    const totalPages = Math.ceil(totalOrders / limitNumber)

    if (totalOrders === 0) {
      return res.status(404).json({ message: "No orders found" })
    }

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      orders: orderData,
      totalOrders,
      totalPages,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    })
  }
})

// @desc Get an order by ID
// @route GET /admin/order/:id
// @access Private/Admin

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate({
    path: "user",
    select: "username email",
  })

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  res.status(200).json(order)
})

// @desc Update an order to cancel
// @route PUT /admin/order/:id/cancel
// @access Private/Admin

export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({ message: "Order has already been delivered" })
  }

  if (order.orderStatus === "Cancelled") {
    return res.status(400).json({ message: "Order has already been cancelled" })
  }

  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (item) => {
      const product = await Product.findByIdAndUpdate(item.productId).select(
        "numberInStock",
        "inStock",
      )
      if (product) {
        product.numberInStock += item.quantity
        product.inStock = true
        await product.save()

        order.orderStatus = "Cancelled"

        await order.save()

        return res.status(200).json(order)
      } else {
        return res.status(400).json({ message: "Order cannot be cancelled" })
      }
    })
  }

  order.orderStatus = "Cancelled"

  await order.save()

  res.status(200).json(order)
})

// @desc Update an order to shipped
// @route PUT /admin/order/:id/ship
// @access Private/Admin

export const shipOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({ message: "Order has already been delivered" })
  }

  if (order.orderStatus === "Cancelled") {
    return res.status(400).json({ message: "Order has been cancelled" })
  }

  order.orderStatus = "Shipped"

  const products = order.orderItems

  products.forEach(async (item) => {
    const product = await Product.findById(item.productId)

    if (product) {
      product.numberInStock -= item.quantity

      if (product.numberInStock === 0) {
        product.inStock = false
      }

      await product.save()
    }
  })

  await order.save()

  res.status(200).json(order)
})

// @desc Update an order to delivered
// @route PUT /admin/order/:id/deliver
// @access Private/Admin

export const deliverOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // Validate current order status before updating
    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .json({ message: "Order has already been delivered" })
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order has been cancelled" })
    }

    if (order.orderStatus !== "Shipped") {
      return res
        .status(400)
        .json({ message: "Order must be shipped before it can be delivered" })
    }

    // Update the order status to "Delivered" and set deliveredAt in one operation
    order.orderStatus = "Delivered"
    order.deliveredAt = Date.now()
    await order.save()

    // Respond with the updated order
    res.status(200).json(order)
  } catch (error) {
    // Handle any errors that may occur
    res
      .status(500)
      .json({ message: "Error delivering the order", error: error.message })
  }
})

// @desc Update an order to Processing
// @route PUT /admin/order/:id/process
// @access Private/Admin

export const processOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .json({ message: "Order has already been delivered" })
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" })
    }

    if (order.orderStatus === "Processing") {
      return res
        .status(400)
        .json({ message: "Order is already being processed" })
    }

    const products = order.orderItems

    products.forEach(async (item) => {
      const product = await Product.findById(item.productId).select(
        "numberInStock inStock",
      )

      if (product) {
        product.numberInStock += item.quantity

        if (product.inStock === false) {
          product.inStock = true
        }

        await product.save()
      }
    })

    order.orderStatus = "Processing"
    await order.save()

    res.status(200).json(order)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing the order", error: error.message })
  }
})

//! TODO: Learn

// @desc get Sales Report
// @route GET /admin/sales-report
// @access Private/Admin

export const getSales = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query

  const {
    startDate: start,
    endDate: end,
    pipeline,
  } = buildSalesPipeline(null, period, startDate, endDate)

  // Execute aggregation
  const salesData = await Sales.aggregate(pipeline)

  // Send response
  res.json({
    period: period || "custom range",
    startDate: start,
    endDate: end,
    totalRevenue: salesData.length > 0 ? salesData[0].totalRevenue : 0,
    totalProductsSold:
      salesData.length > 0 ? salesData[0].totalProductsSold : 0,
    count: salesData.length > 0 ? salesData[0].count : 0,
  })
})

// @desc get Sales Report by Product
// @route GET /admin/sales-report/product
// @access Private/Admin

export const getSalesByProduct = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query
  const productId = req.query.productId

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." })
  }

  const {
    startDate: start,
    endDate: end,
    pipeline,
  } = buildSalesPipeline(productId, period, startDate, endDate)

  // Execute aggregation
  const salesData = await Sales.aggregate(pipeline)

  // Send response
  res.json({
    productId,
    period: period || "custom range",
    startDate: start,
    endDate: end,
    totalRevenue: salesData.length > 0 ? salesData[0].totalRevenue : 0,
    totalProductsSold:
      salesData.length > 0 ? salesData[0].totalProductsSold : 0,
    count: salesData.length > 0 ? salesData[0].count : 0,
  })
})
