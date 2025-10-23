import express from 'express'
import { predictionController } from '~/controllers'
import { authMiddleware, doctorMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router()

// All prediction routes require authentication
router.use(authMiddleware)

// User prediction routes
router.post('/', predictionController.createPrediction)
router.get('/my-predictions', predictionController.getUserPredictions)
router.get('/statistics', predictionController.getPredictionStatistics)
router.get('/:id', predictionController.getPredictionById)
router.put('/:id', predictionController.updatePrediction)
router.delete('/:id', predictionController.deletePrediction)

// Doctor/Admin routes
router.get('/', doctorMiddleware, predictionController.getAllPredictions)

export const predictionRoutes = router