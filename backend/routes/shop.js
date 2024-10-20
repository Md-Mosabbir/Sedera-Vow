import express from "express"
import {
  getFeaturedProducts,
  getProductById,
  getProducts,
  getUserRating,
  postRating,
} from "../controllers/shopController.js"
import protect from "../middleware/auth.js"
const router = express.Router()

router.get("/", getProducts)
router.get("/featured", getFeaturedProducts)
router.get("/:id", getProductById)
router.post("/:id/rate-product", protect, postRating)
router.get("/:id/user-rating", protect, getUserRating)
export default router
