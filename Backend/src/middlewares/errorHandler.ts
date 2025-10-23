import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export interface ApiError extends Error {
  statusCode: number
}

class CustomApiError extends Error implements ApiError {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  let message = 'Đã xảy ra lỗi không mong muốn'

  if ('statusCode' in err) {
    statusCode = err.statusCode
    message = err.message
  }

  console.error(`❌ Error ${statusCode}:`, err.message)

  res.status(statusCode).json({
    error: true,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export default CustomApiError