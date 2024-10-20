import express from "express"
import protect from "../middleware/auth.js"
import admin from "../middleware/admin.js"
import {
  createProduct,
  deleteProduct,
  getAdmin,
  getOrders,
  getOrderById,
  updateProduct,
  featureProduct,
  cancelOrder,
  shipOrder,
  deliverOrder,
  processOrder,
} from "../controllers/adminController.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.get("/", protect, admin, getAdmin)
router.post(
  "/create-product",
  protect,
  admin,
  upload.single("image"),
  createProduct,
)
router.put(
  "/update-product/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct,
)
router.put("/:id/featured", protect, admin, featureProduct)
//!Incomplete
router.delete("/delete-product/:id", protect, admin, deleteProduct)

router.get("/orders", protect, admin, getOrders)
router.get("/order/:id", protect, admin, getOrderById)

router.put("/order/:id/cancel", protect, admin, cancelOrder)
router.put("/order/:id/ship", protect, admin, shipOrder)
router.put("/order/:id/deliver", protect, admin, deliverOrder)
router.put("/order/:id/process", protect, admin, processOrder)

export default router
