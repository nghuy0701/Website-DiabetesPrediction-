"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionResult = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const predictionResultSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID là bắt buộc']
    },
    healthDataId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'HealthData',
        required: [true, 'Health Data ID là bắt buộc']
    },
    predictionScore: {
        type: Number,
        required: [true, 'Điểm dự đoán là bắt buộc'],
        min: [0, 'Điểm dự đoán phải từ 0-1'],
        max: [1, 'Điểm dự đoán phải từ 0-1']
    },
    riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Mức độ rủi ro là bắt buộc']
    },
    confidence: {
        type: Number,
        required: [true, 'Độ tin cậy là bắt buộc'],
        min: [0, 'Độ tin cậy phải từ 0-1'],
        max: [1, 'Độ tin cậy phải từ 0-1']
    },
    modelVersion: {
        type: String,
        required: [true, 'Phiên bản model là bắt buộc'],
        default: 'v1.0'
    },
    inputFeatures: {
        pregnancies: Number,
        glucose: {
            type: Number,
            required: true
        },
        bloodPressure: {
            type: Number,
            required: true
        },
        skinThickness: Number,
        insulin: Number,
        bmi: {
            type: Number,
            required: true
        },
        diabetesPedigreeFunction: Number,
        age: {
            type: Number,
            required: true
        }
    },
    recommendations: [{
            type: String,
            maxlength: [200, 'Khuyến nghị không được quá 200 ký tự']
        }],
    doctorNotes: {
        type: String,
        maxlength: [1000, 'Ghi chú bác sĩ không được quá 1000 ký tự']
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    reviewedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: Date
}, {
    timestamps: true
});
// Index for efficient queries
predictionResultSchema.index({ userId: 1, createdAt: -1 });
predictionResultSchema.index({ riskLevel: 1 });
predictionResultSchema.index({ reviewed: 1 });
exports.PredictionResult = mongoose_1.default.model('PredictionResult', predictionResultSchema);
//# sourceMappingURL=PredictionResult.js.map