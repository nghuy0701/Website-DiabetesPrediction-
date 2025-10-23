import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { predictionService } from '~/services/predictionService'
import ApiError from '~/utils/ApiError'

// ===== INTERFACES & TYPES =====
interface CreatePredictionRequest {
  pregnancies?: number
  glucose: number
  bloodPressure: number
  skinThickness?: number
  insulin?: number
  bmi: number
  diabetesPedigreeFunction?: number
  age: number
  notes?: string
}

interface CreatePredictionResponse {
  message: string
  data: any
}

interface GetPredictionsResponse {
  message: string
  data: any
}

interface GetPredictionByIdResponse {
  message: string
  data: any
}

interface UpdatePredictionRequest {
  doctorNotes?: string
  reviewed?: boolean
  recommendations?: string[]
}

interface UpdatePredictionResponse {
  message: string
  data: any
}

// ===== CONTROLLERS =====

const createPrediction = async (
  req: Request<{}, {}, CreatePredictionRequest, {}>,
  res: Response<CreatePredictionResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.session.user!
    const result = await predictionService.createPrediction(userId, req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'Tạo dự đoán bệnh tiểu đường thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const getUserPredictions = async (
  req: Request,
  res: Response<GetPredictionsResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.session.user!
    const result = await predictionService.getUserPredictions(userId)
    res.status(StatusCodes.OK).json({
      message: 'Lấy lịch sử dự đoán thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const getPredictionById = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response<GetPredictionByIdResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { userId } = req.session.user!
    const result = await predictionService.getPredictionById(id, userId)
    res.status(StatusCodes.OK).json({
      message: 'Lấy thông tin dự đoán thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const getAllPredictions = async (
  req: Request,
  res: Response<GetPredictionsResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await predictionService.getAllPredictions()
    res.status(StatusCodes.OK).json({
      message: 'Lấy tất cả dự đoán thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const updatePrediction = async (
  req: Request<{ id: string }, {}, UpdatePredictionRequest, {}>,
  res: Response<UpdatePredictionResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { userId, role } = req.session.user!
    const result = await predictionService.updatePrediction(id, req.body, userId, role)
    res.status(StatusCodes.OK).json({
      message: 'Cập nhật dự đoán thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const deletePrediction = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { userId, role } = req.session.user!
    await predictionService.deletePrediction(id, userId, role)
    res.status(StatusCodes.OK).json({
      message: 'Xóa dự đoán thành công'
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const getPredictionStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.session.user!
    const result = await predictionService.getPredictionStatistics(userId)
    res.status(StatusCodes.OK).json({
      message: 'Lấy thống kê dự đoán thành công',
      data: result
    })
  } catch (error: any) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

// ===== EXPORTS =====
export type {
  CreatePredictionRequest,
  CreatePredictionResponse,
  GetPredictionsResponse,
  GetPredictionByIdResponse,
  UpdatePredictionRequest,
  UpdatePredictionResponse
}

export const predictionController = {
  createPrediction,
  getUserPredictions,
  getPredictionById,
  getAllPredictions,
  updatePrediction,
  deletePrediction,
  getPredictionStatistics
}