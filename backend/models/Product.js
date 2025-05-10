import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        type: reviewSchema,
      },
    ],
    averageRating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    tier: {
      type: String,
      enum: ["Gold", "Diamond", "Platinum"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const Product = mongoose.model("Product", productSchema)

export default Product
