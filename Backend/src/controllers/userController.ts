import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'
import ApiError from '~/utils/ApiError'

declare module 'express-session' {
  interface SessionData {
    user?: {
      userId: string
      username: string
      role: string
    }
  }
}

// ===== INTERFACES & TYPES =====
interface CreateUserRequest {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  phone?: string
}

interface CreateUserResponse {
  message: string
  data: any
}

interface VerifyEmailRequest {
  email: string
  token: string
}

interface VerifyEmailResponse {
  message: string
  data: any
}

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  data: any
}

interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  phone?: string
}

interface UpdateProfileResponse {
  message: string
  data: any
}

// ===== CONTROLLERS =====

const createNew = async (
  req: Request<{}, {}, CreateUserRequest, {}>,
  res: Response<CreateUserResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const createUser = await userService.createNew(req)
    res.status(StatusCodes.CREATED).json({
      message: 'Tạo tài khoản người dùng thành công',
      data: createUser
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const verifyEmail = async (
  req: Request<{}, {}, VerifyEmailRequest, {}>,
  res: Response<VerifyEmailResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await userService.verifyEmail(req)
    res.status(StatusCodes.OK).json({
      message: 'Xác thực email thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const login = async (
  req: Request<{}, {}, LoginRequest, {}>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> => {
  try {
        const result = await userService.login(req)
    if (result) {
      req.session.user = {
        userId: result._id.toString(),
        username: result.username,
        role: result.role
      }
    }
    res.status(StatusCodes.OK).json({
      message: 'Đăng nhập thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
        const result = await userService.getProfile(req as any)
    res.status(StatusCodes.OK).json({ 
      message: 'Lấy thông tin hồ sơ cá nhân thành công', 
      data: result 
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const updateProfile = async (
  req: Request<{}, {}, UpdateProfileRequest, {}>,
  res: Response<UpdateProfileResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await userService.updateProfile(req as any)
    res.status(StatusCodes.OK).json({ 
      message: 'Cập nhật hồ sơ cá nhân thành công', 
      data: result 
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const logout = (req: Request, res: Response, next: NextFunction): void => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(
          new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message)
        )
      }

      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as
          | 'none'
          | 'lax'
      })

      res.status(StatusCodes.OK).json({
        message: 'Đăng xuất thành công'
      })
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await userService.getAllUsers()
    res.status(StatusCodes.OK).json({
      message: 'Lấy danh sách người dùng thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

// ===== EXPORTS =====
export type {
  CreateUserRequest,
  CreateUserResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  LoginRequest,
  LoginResponse,
  UpdateProfileRequest,
  UpdateProfileResponse
}

export const userController = {
  createNew,
  verifyEmail,
  login,
  logout,
  getProfile,
  updateProfile,
  getAllUsers
}