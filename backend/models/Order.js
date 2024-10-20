import mongoose from "mongoose"
import Product from "./Product.js"

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  // Add the necessary fields which may be problematic if changed in the future in the Product model
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
    default: function () {
      return this.quantity * this.price
    },
  },
})

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [OrderItemSchema],

  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "Cash on Delivery",
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  orderStatus: {
    type: String,
    required: true,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Add a pre-save hook to the OrderItemSchema to populate the necessary fields from the Product model

OrderItemSchema.pre("save", async function (next) {
  if (this.isModified("quantity") || this.isNew) {
    const product = await Product.findById(this.productId)

    if (product) {
      this.name = product.name
      this.imageUrl = product.imageUrl
      this.tier = product.tier
      this.price = product.price
      this.subtotal = this.quantity * this.price
    }
  }
  next()
})

const Order = mongoose.model("Order", OrderSchema)

export default Order
