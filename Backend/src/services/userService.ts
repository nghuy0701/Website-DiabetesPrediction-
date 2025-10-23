import { Request } from 'express'
import { User, IUser } from '~/models'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import crypto from 'crypto'
import { sendVerificationEmail } from '~/utils/emailService'

interface AuthenticatedRequest extends Request {
  session: Request['session'] & {
    user?: {
      userId: string
      username: string
      role: string
    }
  }
  body: any
}

const createNew = async (req: Request): Promise<any> => {
  try {
    const { username, email, password, firstName, lastName, age, gender, phone } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        'Tên người dùng hoặc email đã tồn tại'
      )
    }

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      phone,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    })

    await newUser.save()

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      age: newUser.age,
      gender: newUser.gender,
      phone: newUser.phone,
      role: newUser.role,
      isEmailVerified: newUser.isEmailVerified
    }
  } catch (error: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const verifyEmail = async (req: Request): Promise<any> => {
  try {
    const { email, token } = req.body

    const user = await User.findOne({
      email,
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() }
    })

    if (!user) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Token xác thực không hợp lệ hoặc đã hết hạn'
      )
    }

    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined
    await user.save()

    return {
      message: 'Email đã được xác thực thành công',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    }
  } catch (error: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const login = async (req: Request): Promise<any> => {
  try {
    const { username, password } = req.body

    // Find user and include password for comparison
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    }).select('+password')

    if (!user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Tên người dùng hoặc mật khẩu không đúng'
      )
    }

    if (!user.isEmailVerified) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Vui lòng xác thực email trước khi đăng nhập'
      )
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Tên người dùng hoặc mật khẩu không đúng'
      )
    }

    // Return user without password
    const userWithoutPassword = await User.findById(user._id)
    return userWithoutPassword
  } catch (error: any) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, error.message)
  }
}

const getProfile = async (req: AuthenticatedRequest): Promise<any> => {
  try {
    const { userId } = req.session.user!
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại')
    }

    return user
  } catch (error: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const updateProfile = async (req: AuthenticatedRequest): Promise<any> => {
  try {
    const { userId } = req.session.user!
    const updateData = req.body

    // Remove sensitive fields that shouldn't be updated here
    delete updateData.password
    delete updateData.email
    delete updateData.username
    delete updateData.role

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại')
    }

    return updatedUser
  } catch (error: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getAllUsers = async (): Promise<any> => {
  try {
    const users = await User.find()
      .select('-password -emailVerificationToken -emailVerificationExpires')
      .sort({ createdAt: -1 })

    return {
      users,
      total: users.length
    }
  } catch (error: any) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

export const userService = {
  createNew,
  verifyEmail,
  login,
  getProfile,
  updateProfile,
  getAllUsers
}