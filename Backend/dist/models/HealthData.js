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
exports.HealthData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const healthDataSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID là bắt buộc']
    },
    pregnancies: {
        type: Number,
        min: [0, 'Số lần mang thai không thể âm'],
        max: [20, 'Số lần mang thai không hợp lệ']
    },
    glucose: {
        type: Number,
        required: [true, 'Chỉ số glucose là bắt buộc'],
        min: [0, 'Chỉ số glucose phải lớn hơn 0'],
        max: [300, 'Chỉ số glucose quá cao']
    },
    bloodPressure: {
        type: Number,
        required: [true, 'Huyết áp là bắt buộc'],
        min: [40, 'Huyết áp quá thấp'],
        max: [200, 'Huyết áp quá cao']
    },
    skinThickness: {
        type: Number,
        min: [0, 'Độ dày da không thể âm'],
        max: [100, 'Độ dày da quá cao']
    },
    insulin: {
        type: Number,
        min: [0, 'Chỉ số insulin không thể âm'],
        max: [900, 'Chỉ số insulin quá cao']
    },
    bmi: {
        type: Number,
        required: [true, 'BMI là bắt buộc'],
        min: [10, 'BMI quá thấp'],
        max: [70, 'BMI quá cao']
    },
    diabetesPedigreeFunction: {
        type: Number,
        min: [0, 'Diabetes Pedigree Function không thể âm'],
        max: [3, 'Diabetes Pedigree Function quá cao']
    },
    age: {
        type: Number,
        required: [true, 'Tuổi là bắt buộc'],
        min: [1, 'Tuổi phải lớn hơn 0'],
        max: [120, 'Tuổi không hợp lệ']
    },
    recordedAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        maxlength: [500, 'Ghi chú không được quá 500 ký tự']
    }
}, {
    timestamps: true
});
// Index for efficient queries
healthDataSchema.index({ userId: 1, recordedAt: -1 });
exports.HealthData = mongoose_1.default.model('HealthData', healthDataSchema);
//# sourceMappingURL=HealthData.js.map