import express from 'express'
import { userRoutes } from './userRoutes'
import { predictionRoutes } from './predictionRoutes'

const router = express.Router()

// API Routes
router.use('/auth', userRoutes)
router.use('/predictions', predictionRoutes)

// API Info
router.get('/', (req, res) => {
  res.json({
    message: 'Diabetes Prediction API v1.0',
    status: 'Active',
    endpoints: {
      auth: '/api/v1/auth',
      predictions: '/api/v1/predictions'
    },
    documentation: 'https://github.com/your-repo/diabetes-prediction-api'
  })
})

export const routes = router