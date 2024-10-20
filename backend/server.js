import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"
import users from "./routes/users.js"
import shop from "./routes/shop.js"
import cart from "./routes/cart.js"
import admin from "./routes/admin.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)
app.use(express.json(), express.urlencoded({ extended: true }))
app.use(cookieParser())

// Connect to MongoDB
connectDB()

// Routes
app.use("/users", users)
app.use("/shop", shop)
app.use("/cart", cart)
app.use("/admin", admin)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
