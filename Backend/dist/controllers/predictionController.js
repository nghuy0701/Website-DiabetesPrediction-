"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const predictionService_1 = require("../services/predictionService");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// ===== CONTROLLERS =====
const createPrediction = async (req, res, next) => {
    try {
        const { userId } = req.session.user;
        const result = await predictionService_1.predictionService.createPrediction(userId, req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: 'Tạo dự đoán bệnh tiểu đường thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const getUserPredictions = async (req, res, next) => {
    try {
        const { userId } = req.session.user;
        const result = await predictionService_1.predictionService.getUserPredictions(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Lấy lịch sử dự đoán thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const getPredictionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.session.user;
        const result = await predictionService_1.predictionService.getPredictionById(id, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Lấy thông tin dự đoán thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const getAllPredictions = async (req, res, next) => {
    try {
        const result = await predictionService_1.predictionService.getAllPredictions();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Lấy tất cả dự đoán thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const updatePrediction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, role } = req.session.user;
        const result = await predictionService_1.predictionService.updatePrediction(id, req.body, userId, role);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Cập nhật dự đoán thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const deletePrediction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, role } = req.session.user;
        await predictionService_1.predictionService.deletePrediction(id, userId, role);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Xóa dự đoán thành công'
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const getPredictionStatistics = async (req, res, next) => {
    try {
        const { userId } = req.session.user;
        const result = await predictionService_1.predictionService.getPredictionStatistics(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Lấy thống kê dự đoán thành công',
            data: result
        });
    }
    catch (error) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
exports.predictionController = {
    createPrediction,
    getUserPredictions,
    getPredictionById,
    getAllPredictions,
    updatePrediction,
    deletePrediction,
    getPredictionStatistics
};
//# sourceMappingURL=predictionController.js.map