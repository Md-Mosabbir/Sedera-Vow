import mongoose from "mongoose"

const salesSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    // This can represent the total cost of the products before any discounts or additional charges
  },
  revenue: {
    type: Number,
    required: true,
    // This can represent the final revenue from the sale after discounts and additional charges
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Optional fields based on your requirements
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Delivered",
  },
})

const Sales = mongoose.model("Sales", salesSchema)

export default Sales
