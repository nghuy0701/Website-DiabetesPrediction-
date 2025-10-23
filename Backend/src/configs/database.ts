import mongoose from 'mongoose'
import { env } from './environment'

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI)
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ Database connection error:', error)
    process.exit(1)
  }
}