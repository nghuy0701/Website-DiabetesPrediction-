import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { env } from '~/configs/environment'
import { connectDB } from '~/configs/database'
import { errorHandler } from '~/middlewares/errorHandler'
import { routes } from '~/routes'

const app = express()

// Connect to Database
connectDB()

// Middleware
app.use(helmet())
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Session configuration
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI
  }),
  cookie: {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}))

// Routes
app.use('/api/v1', routes)

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Diabetes Prediction API is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'API endpoint không tồn tại',
    path: req.originalUrl
  })
})

const PORT = env.PORT || 8017

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại port ${PORT}`)
  console.log(`📊 Diabetes Prediction API: http://localhost:${PORT}`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
})

export default app