import { check, validationResult } from "express-validator"
import Product from "../models/Product.js"
import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import Order from "../models/Order.js"

// @route   GET /cart
// @desc    Get cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "cart.productId",
    select: "name tier imageUrl description",
  })

  if (user) {
    res.json(user.cart)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @route   POST /cart
// @desc    Add to cart
// @access  Private

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body

  // Validate input
  await check("productId", "Product ID is required").not().isEmpty().run(req)
  await check("quantity", "Quantity is required").run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Fetch user
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  // Fetch product
  const product = await Product.findById(productId)
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  // Parse and validate quantity
  const quantityNumber = Number(quantity)
  if (quantityNumber === 0) {
    return res.status(400).json({ message: "Quantity must not be 0" })
  }

  // Find existing product in cart
  const existingProduct = user.cart.find(
    (p) => p.productId.toString() === productId,
  )

  // Check stock and update cart
  if (existingProduct) {
    const total = quantityNumber + existingProduct.quantity

    if (total > product.numberInStock) {
      return res.status(400).json({ message: "Not enough stock" })
    }

    if (total < 1) {
      return res.status(400).json({ message: "Quantity must not be 0" })
    }

    existingProduct.quantity += quantityNumber
    existingProduct.subtotal = existingProduct.quantity * product.price
  } else {
    user.cart.push({
      productId,
      quantity: quantityNumber,
      price: product.price,
      subtotal: quantityNumber * product.price,
    })
  }

  // Save user cart
  await user.save()

  return res.status(201).json(user.cart)
})

// @route   DELETE /cart
// @desc    Remove from cart
// @access  Private

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body

  // Validate input
  await check("productId", "Product ID is required").not().isEmpty().run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Fetch user
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  // Find existing product in cart
  const existingProductIndex = user.cart.findIndex(
    (p) => p.productId.toString() === productId,
  )

  if (existingProductIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" })
  }

  // Remove product from cart
  user.cart.splice(existingProductIndex, 1)

  // Save user cart
  await user.save()

  return res.json(user.cart)
})

// @desc Create an order
// @route POST /order
// @access Private

export const createOrder = asyncHandler(async (req, res) => {
  try {
    await check("paymentMethod", "Payment method is required")
      .isString()
      .run(req)
    await check("address", "Address is required").isString().run(req)
    await check("city", "City is required").isString().run(req)
    await check("postalCode", "Postal code is required").isString().run(req)
    await check("phoneNumber", "Phone number is required").isString().run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { address, city, postalCode, paymentMethod, phoneNumber } = req.body

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    const populatedCart = await User.findById(req.user.id).populate({
      path: "cart.productId",
      select: "name tier imageUrl",
    })

    const orderItems = populatedCart.cart.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      tier: item.productId.tier,
      imageUrl: item.productId.imageUrl,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
    }))

    const order = new Order({
      user: req.user.id,
      orderItems,

      phoneNumber,
      shippingAddress: {
        address,
        city,
        postalCode,
      },
      paymentMethod,
      status: "Processing",
      orderDate: new Date(),
    })

    await order.save()

    await User.updateOne(
      { _id: req.user.id },
      {
        $set: { cart: [] }, // Clear the cart
        $push: {
          orders: order._id, // Push the ObjectId directly
        },
      },
    )

    res.status(201).json(order)
  } catch (e) {
    console.log(e)

    res.status(500).json({ message: "Server error" })
  }
})
