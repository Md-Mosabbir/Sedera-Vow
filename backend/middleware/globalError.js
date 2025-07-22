import logger from "../utils/logger.js" // adjust the path as needed

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  // Log the error with Winston
  if (process.env.NODE_ENV === "development") {
    logger.error(err.stack)
  } else {
    logger.error(err.message)
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

export default globalErrorHandler
