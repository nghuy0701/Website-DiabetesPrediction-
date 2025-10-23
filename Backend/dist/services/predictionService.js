"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictionService = void 0;
const models_1 = require("../models");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_codes_1 = require("http-status-codes");
// Diabetes prediction algorithm (simplified ML model simulation)
const predictDiabetes = (input) => {
    const { pregnancies = 0, glucose, bloodPressure, skinThickness = 20, insulin = 80, bmi, diabetesPedigreeFunction = 0.5, age } = input;
    // Normalize features (simplified normalization)
    const normalizedFeatures = {
        pregnancies: Math.min(pregnancies / 10, 1),
        glucose: Math.min(glucose / 200, 1),
        bloodPressure: Math.min(bloodPressure / 140, 1),
        skinThickness: Math.min(skinThickness / 50, 1),
        insulin: Math.min(insulin / 300, 1),
        bmi: Math.min(bmi / 50, 1),
        diabetesPedigreeFunction: Math.min(diabetesPedigreeFunction / 2, 1),
        age: Math.min(age / 100, 1)
    };
    // Simple scoring algorithm (weights based on medical literature)
    const weights = {
        pregnancies: 0.1,
        glucose: 0.25,
        bloodPressure: 0.15,
        skinThickness: 0.05,
        insulin: 0.15,
        bmi: 0.15,
        diabetesPedigreeFunction: 0.1,
        age: 0.05
    };
    let score = 0;
    score += normalizedFeatures.pregnancies * weights.pregnancies;
    score += normalizedFeatures.glucose * weights.glucose;
    score += normalizedFeatures.bloodPressure * weights.bloodPressure;
    score += normalizedFeatures.skinThickness * weights.skinThickness;
    score += normalizedFeatures.insulin * weights.insulin;
    score += normalizedFeatures.bmi * weights.bmi;
    score += normalizedFeatures.diabetesPedigreeFunction * weights.diabetesPedigreeFunction;
    score += normalizedFeatures.age * weights.age;
    // Determine risk level
    let riskLevel;
    if (score < 0.3) {
        riskLevel = 'low';
    }
    else if (score < 0.6) {
        riskLevel = 'medium';
    }
    else {
        riskLevel = 'high';
    }
    // Calculate confidence (simplified)
    const confidence = Math.min(0.7 + Math.random() * 0.25, 0.95);
    return {
        predictionScore: Math.round(score * 1000) / 1000, // Round to 3 decimal places
        riskLevel,
        confidence: Math.round(confidence * 1000) / 1000
    };
};
// Generate recommendations based on risk level and input data
const generateRecommendations = (input, riskLevel) => {
    const recommendations = [];
    if (input.glucose > 140) {
        recommendations.push('Kiểm soát lượng đường trong máu bằng cách hạn chế đường và tinh bột');
    }
    if (input.bmi > 25) {
        recommendations.push('Duy trì cân nặng khỏe mạnh thông qua chế độ ăn và tập thể dục');
    }
    if (input.bloodPressure > 130) {
        recommendations.push('Kiểm soát huyết áp bằng cách giảm muối và tăng cường vận động');
    }
    if (riskLevel === 'high') {
        recommendations.push('Khám sức khỏe định kỳ và tham khảo ý kiến bác sĩ chuyên khoa');
        recommendations.push('Thực hiện xét nghiệm đường huyết định kỳ');
    }
    else if (riskLevel === 'medium') {
        recommendations.push('Duy trì lối sống lành mạnh và kiểm tra sức khỏe định kỳ');
        recommendations.push('Tăng cường hoạt động thể chất ít nhất 30 phút/ngày');
    }
    else {
        recommendations.push('Duy trì lối sống hiện tại và kiểm tra sức khỏe hàng năm');
        recommendations.push('Tiếp tục chế độ ăn uống cân bằng và tập thể dục đều đặn');
    }
    return recommendations;
};
const createPrediction = async (userId, inputData) => {
    try {
        // Save health data first
        const healthData = new models_1.HealthData({
            userId,
            ...inputData
        });
        await healthData.save();
        // Generate prediction
        const predictionResult = predictDiabetes(inputData);
        const recommendations = generateRecommendations(inputData, predictionResult.riskLevel);
        // Save prediction result
        const prediction = new models_1.PredictionResult({
            userId,
            healthDataId: healthData._id,
            predictionScore: predictionResult.predictionScore,
            riskLevel: predictionResult.riskLevel,
            confidence: predictionResult.confidence,
            modelVersion: 'v1.0',
            inputFeatures: {
                pregnancies: inputData.pregnancies,
                glucose: inputData.glucose,
                bloodPressure: inputData.bloodPressure,
                skinThickness: inputData.skinThickness,
                insulin: inputData.insulin,
                bmi: inputData.bmi,
                diabetesPedigreeFunction: inputData.diabetesPedigreeFunction,
                age: inputData.age
            },
            recommendations
        });
        await prediction.save();
        return {
            prediction,
            healthData
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const getUserPredictions = async (userId) => {
    try {
        const predictions = await models_1.PredictionResult.find({ userId })
            .populate('healthDataId')
            .sort({ createdAt: -1 });
        return {
            predictions,
            total: predictions.length
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const getPredictionById = async (predictionId, userId) => {
    try {
        const prediction = await models_1.PredictionResult.findOne({
            _id: predictionId,
            userId
        }).populate('healthDataId');
        if (!prediction) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Không tìm thấy dự đoán');
        }
        return prediction;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const getAllPredictions = async () => {
    try {
        const predictions = await models_1.PredictionResult.find()
            .populate('userId', 'username email')
            .populate('healthDataId')
            .sort({ createdAt: -1 });
        return {
            predictions,
            total: predictions.length
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const updatePrediction = async (predictionId, updateData, userId, userRole) => {
    try {
        let query = { _id: predictionId };
        // Regular users can only update their own predictions
        if (userRole === 'user') {
            query.userId = userId;
        }
        const prediction = await models_1.PredictionResult.findOneAndUpdate(query, updateData, { new: true, runValidators: true }).populate('healthDataId');
        if (!prediction) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Không tìm thấy dự đoán');
        }
        // If reviewed by doctor, add review info
        if (updateData.reviewed && (userRole === 'doctor' || userRole === 'admin')) {
            prediction.reviewedBy = userId;
            prediction.reviewedAt = new Date();
            await prediction.save();
        }
        return prediction;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const deletePrediction = async (predictionId, userId, userRole) => {
    try {
        let query = { _id: predictionId };
        // Regular users can only delete their own predictions
        if (userRole === 'user') {
            query.userId = userId;
        }
        // First find the prediction to get healthDataId
        const prediction = await models_1.PredictionResult.findOne(query);
        if (!prediction) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Không tìm thấy dự đoán');
        }
        // Delete the prediction
        await models_1.PredictionResult.findOneAndDelete(query);
        // Also delete associated health data
        if (prediction.healthDataId) {
            await models_1.HealthData.findByIdAndDelete(prediction.healthDataId);
        }
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
const getPredictionStatistics = async (userId) => {
    try {
        const predictions = await models_1.PredictionResult.find({ userId });
        const stats = {
            total: predictions.length,
            riskLevels: {
                low: predictions.filter(p => p.riskLevel === 'low').length,
                medium: predictions.filter(p => p.riskLevel === 'medium').length,
                high: predictions.filter(p => p.riskLevel === 'high').length
            },
            averageScore: predictions.length > 0
                ? predictions.reduce((sum, p) => sum + p.predictionScore, 0) / predictions.length
                : 0,
            latestPrediction: predictions.length > 0
                ? predictions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
                : null
        };
        return stats;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
};
exports.predictionService = {
    createPrediction,
    getUserPredictions,
    getPredictionById,
    getAllPredictions,
    updatePrediction,
    deletePrediction,
    getPredictionStatistics
};
//# sourceMappingURL=predictionService.js.map