
import { Format } from "logform";
import winston, { Logger } from "winston";
import morgan, { StreamOptions } from "morgan";
import config from "../config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

const level: () => string = () => {
  const env = config.env || 'development'
  return env === 'development' ? 'debug' : 'warn'
}

const format: Format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
]

const logger: Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

winston.addColors(colors)

const stream: StreamOptions = {
  write: (message) => logger.http(message)
}

const skip = () => {
  const env = config.env || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
)

export {logger, morganMiddleware} 