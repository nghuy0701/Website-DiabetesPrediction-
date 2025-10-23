import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

interface AuthenticatedRequest extends Request {
  session: Request['session'] & {
    user?: {
      userId: string
      username: string
      role: string
    }
  }
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.session.user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Vui lòng đăng nhập để truy cập'
      )
    }

    next()
  } catch (error: any) {
    next(error)
  }
}

export const adminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.session.user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Vui lòng đăng nhập để truy cập'
      )
    }

    if (req.session.user.role !== 'admin') {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'Bạn không có quyền truy cập tính năng này'
      )
    }

    next()
  } catch (error: any) {
    next(error)
  }
}

export const doctorMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.session.user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Vui lòng đăng nhập để truy cập'
      )
    }

    if (!['doctor', 'admin'].includes(req.session.user.role)) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'Chỉ bác sĩ mới có thể truy cập tính năng này'
      )
    }

    next()
  } catch (error: any) {
    next(error)
  }
}