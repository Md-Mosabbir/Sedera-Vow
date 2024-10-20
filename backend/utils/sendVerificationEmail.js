import transporter from "../config/emailService.js"

export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    // eslint-disable-next-line no-undef
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    html: `
      <p>Dear User,</p>
      <p>Thank you for registering with Sedera Vow. Please use the following verification code to activate your account:</p>
      <h3>${verificationCode}</h3>
      <p>If you did not register for Sedera Vow, please ignore this email.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Verification email sent successfully.")
  } catch (error) {
    console.error("Error sending verification email:", error)
    throw new Error("Failed to send verification email.")
  }
}
