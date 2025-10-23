import express from 'express'
import { userController } from '~/controllers'
import { authMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router()

// Public routes
router.post('/register', userController.createNew)
router.post('/verify-email', userController.verifyEmail)
router.post('/login', userController.login)

// Protected routes
router.use(authMiddleware) // Apply authentication middleware to all routes below

router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.post('/logout', userController.logout)

// Admin routes
router.get('/users', userController.getAllUsers) // TODO: Add admin middleware

export const userRoutes = router