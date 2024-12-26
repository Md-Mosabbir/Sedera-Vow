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
} from "../controllers/userController.js"
import protect from "../middleware/auth.js"
const router = express.Router()
import { upload } from "../middleware/multer.js"

router.post("/sign-up", upload.single("image"), registerUser)
router.post("/sign-in", loginUser)
router.post("/:username/verify", verifyUser)
router.get("/profile", protect, getUserProfile)

router.get("/orders", protect, getUserOrders)
router.post("/order", protect, makeOrder)
router.get("/order/:id", protect, getUserOrderById)
router.put("/order/:id/cancel", protect, cancelOrder)

router.get("/wishlist", protect, getWishlist)
router.post("/wishlist/:id", protect, addToWishlist)
router.delete("/wishlist/:id", protect, removeFromWishlist)

router.post("/logout", logoutUser)

export default router
