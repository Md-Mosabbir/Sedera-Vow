import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // eslint-disable-next-line no-undef
    user: process.env.EMAIL,
    // eslint-disable-next-line no-undef
    pass: process.env.PASSWORD,
  },
})

export default transporter
