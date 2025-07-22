import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"
import users from "./routes/users.js"
import shop from "./routes/shop.js"
import cart from "./routes/cart.js"
import admin from "./routes/admin.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import AppError from "./utils/AppError.js"
import globalErrorHandler from "./middleware/globalError.js"
import morgan from "morgan"
import logger from "./utils/logger.js"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

const app = express()

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
})

app.use(generalLimiter)
app.use(helmet())

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)
app.use(express.json(), express.urlencoded({ extended: true }))
app.use(cookieParser())

// Use morgan only in development to avoid clutter in production logs
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")) // concise colored logs in dev
} else {
  app.use(morgan("combined")) // Apache-style logs in production
}

app.disable("x-powered-by")
// Connect to MongoDB
connectDB()

// Routes
app.use("/users", users)
app.use("/shop", shop)
app.use("/cart", cart)
app.use("/admin", admin)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} on ${process.env.NODE_ENV}`)
})
