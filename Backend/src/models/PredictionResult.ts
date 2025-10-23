import mongoose, { Document, Schema } from 'mongoose'

export interface IPredictionResult extends Document {
  userId: mongoose.Types.ObjectId
  healthDataId: mongoose.Types.ObjectId
  predictionScore: number
  riskLevel: 'low' | 'medium' | 'high'
  confidence: number
  modelVersion: string
  inputFeatures: {
    pregnancies?: number
    glucose: number
    bloodPressure: number
    skinThickness?: number
    insulin?: number
    bmi: number
    diabetesPedigreeFunction?: number
    age: number
  }
  recommendations?: string[]
  doctorNotes?: string
  reviewed: boolean
  reviewedBy?: mongoose.Types.ObjectId
  reviewedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const predictionResultSchema = new Schema<IPredictionResult>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID là bắt buộc']
  },
  healthDataId: {
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date
}, {
  timestamps: true
})

// Index for efficient queries
predictionResultSchema.index({ userId: 1, createdAt: -1 })
predictionResultSchema.index({ riskLevel: 1 })
predictionResultSchema.index({ reviewed: 1 })

export const PredictionResult = mongoose.model<IPredictionResult>('PredictionResult', predictionResultSchema)