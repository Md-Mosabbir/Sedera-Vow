import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { check, validationResult } from "express-validator"
import asyncHandler from "express-async-handler"
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from "fs"
import Product from "../models/Product.js"
import Order from "../models/Order.js"
import mongoose from "mongoose"

// @desc Sign-up user
// @route POST /users/sign-up
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  // Destructure the request body
  await check("username", "Username is required").not().isEmpty().run(req)
  await check("email", "Please include a valid email").isEmail().run(req)
  await check("password", "Please enter a password with 6 or more characters")
    .isLength({ min: 6 })
    .run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { username, email, password } = req.body

  try {
    // Check if user already exists but not verified
    let user = await User.findOne({ email })

    if (user) {
      if (!user.isVerified) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000)
        const verificationCodeExpires = Date.now() + 10 * 60 * 1000

        // Update the user's verification code and expiration in the database
        await User.findOneAndUpdate(
          { email },
          { verificationCode, verificationCodeExpires },
        )

        // Send a new verification code to the user's email
        await sendVerificationEmail(email, verificationCode)

        // Respond with a success status and message
        return res.status(200).json({
          message: "User already exists and has been sent a new code.",
        })
      } else {
        return res
          .status(400)
          .json({ errors: [{ message: "User already exists and verified" }] })
      }
    }

    // Check if username already exists
    let checkName = await User.findOne({ username })

    if (checkName) {
      return res
        .status(400)
        .json({ errors: [{ message: "Username already exists" }] })
    }
    let profilePicture = ""

    if (req.file) {
      const localFilePath = req.file.path
      const uploadedImage = await uploadOnCloudinary(localFilePath)

      if (!uploadedImage) {
        return res.status(500).json({ message: "Image upload failed" })
      }

      fs.unlinkSync(localFilePath)
      profilePicture = uploadedImage.url
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000)
    const verificationCodeExpires = Date.now() + 10 * 60 * 1000

    // Create a new user
    user = new User({
      profilePicture,
      username,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
      isVerified: false,
    })
    await user.save()

    // Send the verification email
    await sendVerificationEmail(email, verificationCode)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      email: user.email,
      token: generateToken(user._id),
      message: "User created successfully",
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: [{ message: "Server Error" }] })
  }
})

// @desc Verify user
// @route POST /users/verify/:username
// @access Public
export const verifyUser = asyncHandler(async (req, res) => {
  const { username } = req.params
  const { code } = req.body

  try {
    let user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ errors: [{ message: "User not found" }] })
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ errors: [{ message: "User already verified" }] })
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ errors: [{ message: "Invalid code" }] })
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ errors: [{ message: "Code expired" }] })
    }

    user.isVerified = true
    await user.save()

    res.status(200).json({ message: "User verified successfully" })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: [{ message: error }] })
  }
})

// @desc Login user
// @route POST /users/sign-in
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  await check("email", "Please include a valid email").isEmail().run(req)
  await check("password", "Password is required").exists().run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [{ message: "Invalid email" }] })
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ errors: [{ message: "Please verify your email" }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ message: "Invalid password" }] })
    }
    const token = generateToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,

      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === "production",
    })

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      message: "User signed-in successfuly",
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: [{ message: "Server Error" }] })
  }
})

// desc Logout user
// @route POST /users/logout
// @access Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ message: "Logged out" })
})

// @desc Update user profile
// @route PUT /users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  await check("username", "Username is required").optional().isString().run(req)
  await check("email", "Please include a valid email")
    .optional()
    .isEmail()
    .run(req)
  await check("password", "Please enter a password with 6 or more characters")
    .optional()
    .isLength({ min: 6 })
    .run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Find user first
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const { username, email, password } = req.body

  // Update fields if provided
  if (username) user.username = username
  if (email) user.email = email
  if (password) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
  }

  // Handle profile picture upload
  if (req.file) {
    const localFilePath = req.file.path
    const uploadedImage = await uploadOnCloudinary(localFilePath)

    if (!uploadedImage) {
      return res.status(500).json({ message: "Image upload failed" })
    }

    fs.unlinkSync(localFilePath) // Remove the local file after successful upload
    user.profilePicture = uploadedImage.url
  }

  console.log(req.body)

  await user.save()

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    message: "User updated successfully",
  })
})

// @desc Get user profile
// @route GET /users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      isVerified: user.isVerified,
    })
  } else {
    res.status(404).json({ message: "User not found" })
  }
})

// @desc Get user's wishlist
// @route GET /users/wishlist
// @access Private

export const getWishlist = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Find the user and populate `product` in the `wishlist` array
  const user = await User.findById(req.user.id).populate({
    path: "wishlist.product", // Correctly populate the `product` field
    select: "name price category imageUrl price averageRating numberOfReviews",
  })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const totalWishlist = user.wishlist.length

  if (totalWishlist === 0) {
    return res.status(200).json({ wishlist: [], message: "Wishlist is empty" })
  }

  // Apply pagination to the `wishlist` array
  const paginatedWishlist = user.wishlist.slice(skip, skip + limit)
  const totalPages = Math.ceil(totalWishlist / limit)

  // Flatten the `wishlist` to return only the populated product details
  const flattenedWishlist = paginatedWishlist.map((item) => item.product)

  res.status(200).json({
    wishlist: flattenedWishlist,
    totalWishlist,
    totalPages,
    currentPage: page,
  })
})

// @desc Add to wishlist
// @route POST /users/wishlist/:id
// @access Private

export const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const productId = req.params.id

  // Find the user
  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  // Find the product
  const product = await Product.findById(productId)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  // Check if the product is already in the user's wishlist
  const isProductInWishlist = user.wishlist.some(
    (item) => item.product.toString() === productId,
  )

  if (isProductInWishlist) {
    return res.status(400).json({ message: "Product already in wishlist" })
  }

  // Add the product to the wishlist
  user.wishlist.push({ product: productId })

  await user.save()

  res.status(200).json({ message: "Product added to wishlist" })
})

// @desc Remove from wishlist
// @route DELETE /users/wishlist/:id
// @access Private

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const productId = req.params.id

  // Find the user
  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  // Check if the product exists in the wishlist
  const isProductInWishlist = user.wishlist.some(
    (item) => item.product.toString() === productId,
  )

  if (!isProductInWishlist) {
    return res.status(400).json({ message: "Product not in wishlist" })
  }

  // Remove the product from the wishlist
  user.wishlist = user.wishlist.filter(
    (item) => item.product.toString() !== productId,
  )

  await user.save()

  res.status(200).json({ message: "Product removed from wishlist" })
})

// @desc Get user orders and wishlist
// @route GET /users/orders
// @access Private

export const getUserOrders = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id)

  // Pagination parameters
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Search and Sort Parameters
  const search = req.query.search || "" // Search in order details
  const types = req.query.types ? req.query.types.split(",") : []

  const sort = req.query.sort || "createdAt" // Sort field
  const order = req.query.order === "asc" ? 1 : -1 // Sort order

  // Enum values for orderStatus from the schema
  const orderStatusEnum = ["Processing", "Shipped", "Delivered", "Cancelled"]

  // Match conditions
  const matchCondition = { user: userId }

  if (types.length > 0) {
    // Check if the provided types are valid orderStatus values
    const validStatuses = types.filter(
      (type) => orderStatusEnum.includes(type), // Validate type against the orderStatus enum
    )

    if (validStatuses.length > 0) {
      matchCondition.orderStatus = { $in: validStatuses } // Match any of the valid statuses
    }
  }

  if (search) {
    matchCondition.$or = [
      { "shippingAddress.city": { $regex: search, $options: "i" } },
      { "shippingAddress.state": { $regex: search, $options: "i" } },
      { "shippingAddress.postalCode": { $regex: search, $options: "i" } },
    ]
  }

  // Total Count Pipeline
  const totalPipeline = [{ $match: matchCondition }, { $count: "total" }]
  const totalResult = await Order.aggregate(totalPipeline)
  const totalOrders = totalResult.length > 0 ? totalResult[0].total : 0

  if (totalOrders === 0) {
    return res.status(200).json({ orders: [], message: "No orders found" })
  }

  // Orders Fetch Pipeline
  const ordersPipeline = [
    { $match: matchCondition },
    { $sort: { [sort]: order } },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        shippingAddress: 1,
        orderStatus: 1,
      },
    },
  ]

  const orders = await Order.aggregate(ordersPipeline)
  const totalPages = Math.ceil(totalOrders / limit)

  res.status(200).json({
    orders,
    totalOrders,
    totalPages,
    currentPage: page,
  })
})

// @desc Get user order by ID
// @route GET /users/orders/:id
// @access Private

export const getUserOrderById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "orders",
  })

  const order = user.orders.find((o) => o._id.toString() === req.params.id)

  await order.populate({
    path: "orderItems.productId",
    select: "name tier category imageUrl",
  })

  if (order) {
    res.json(order)
  } else {
    res.status(404).json({ message: "Order not found" })
  }
})

// @desc Cancel order
// @route PUT /users/orders/:id/cancel
// @access Private

export const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "orders",
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const order = user.orders.find((o) => o._id.toString() === req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order already cancelled" })
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({ message: "Order already delivered" })
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
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: [{ message: "Server Error" }] })
  }
})

// @desc make order
// @route POST /users/orders
// @access Private

export const makeOrder = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "cart",
      populate: {
        path: "productId",
        select: "name tier imageUrl",
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    await check("address", "Address is required").not().isEmpty().run(req)
    await check("city", "City is required").not().isEmpty().run(req)
    await check("postalCode", "Postal code is required")
      .not()
      .isEmpty()
      .run(req)
    await check("paymentMethod", "Payment method is required")
      .not()
      .isEmpty()
      .run(req)
    await check("phoneNumber", "Phone number is required")
      .not()
      .isEmpty()
      .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { address, city, postalCode, paymentMethod, phoneNumber } = req.body

    const orderItems = user.cart.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        name: item.productId.name,
        imageUrl: item.productId.imageUrl,
        tier: item.productId.tier,
      }
    })

    const order = {
      user: req.user.id,
      orderItems,
      shippingAddress: {
        address,
        city,
        postalCode,
      },
      paymentMethod,
      phoneNumber,
    }

    const newOrder = await Order.create(order)

    user.orders.push(newOrder._id)

    user.cart = []

    await user.save()

    res.status(201).json(newOrder)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: [{ message: "Server Error" }] })
  }
})

// Generate JWT
const generateToken = (id) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  })
}
