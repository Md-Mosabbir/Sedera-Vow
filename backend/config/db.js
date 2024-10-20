import mongoose from "mongoose"
import "dotenv/config"

const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(db).catch((err) => console.log(err))
    console.log("MongoDB Connected")
  } catch (error) {
    throw new Error("Internal Error: ", error)
  }
}

export default connectDB
