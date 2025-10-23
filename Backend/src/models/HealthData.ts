import mongoose, { Document, Schema } from 'mongoose'

export interface IHealthData extends Document {
  userId: mongoose.Types.ObjectId
  pregnancies?: number
  glucose: number
  bloodPressure: number
  skinThickness?: number
  insulin?: number
  bmi: number
  diabetesPedigreeFunction?: number
  age: number
  recordedAt: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const healthDataSchema = new Schema<IHealthData>({
  userId: {
    type: Schema.Types.ObjectId,
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
})

// Index for efficient queries
healthDataSchema.index({ userId: 1, recordedAt: -1 })

export const HealthData = mongoose.model<IHealthData>('HealthData', healthDataSchema)