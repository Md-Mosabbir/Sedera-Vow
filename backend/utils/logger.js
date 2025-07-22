import winston from "winston"
import path from "path"

const logDir = path.resolve("logs")

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: `${logDir}/combined.log` }),
  ],
  exitOnError: false,
})

export default logger
