import express from "express"
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getUserOrders,
  getUserOrderById,
  cancelOrder,
  makeOrder,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  updateUserProfile,
} from "../controllers/userController.js"
import protect from "../middleware/auth.js"
const router = express.Router()
import { upload } from "../middleware/multer.js"
import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 attempts per 15 minutes
  message: "Too many login attempts, please try again later.",
})

router.post("/sign-up", authLimiter, upload.single("image"), registerUser)
router.post("/sign-in", authLimiter, loginUser)
router.post("/:username/verify", authLimiter, verifyUser)
router.get("/profile", protect, getUserProfile)
router.post("/edit", upload.single("image"), protect, updateUserProfile)

router.get("/orders", protect, getUserOrders)
router.post("/order", protect, makeOrder)
router.get("/order/:id", protect, getUserOrderById)
router.put("/order/:id/cancel", protect, cancelOrder)

router.get("/wishlist", protect, getWishlist)
router.post("/wishlist/:id", protect, addToWishlist)
router.delete("/wishlist/:id", protect, removeFromWishlist)

router.post("/logout", logoutUser)

export default router
