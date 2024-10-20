import jwt from "jsonwebtoken"

import User from "../models/User.js"

const verifyAdmin = async function (req, res, next) {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "No token for admin approval" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" })
    }

    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" })
  }
}

export default verifyAdmin
