import express from "express"
import protect from "../middleware/auth.js"
import {
  getCart,
  addToCart,
  removeFromCart,
  createOrder,
} from "../controllers/cartController.js"

const router = express.Router()

router.get("/", protect, getCart)
router.post("/", protect, addToCart)
router.post("/order", protect, createOrder)
router.delete("/", protect, removeFromCart)

export default router
