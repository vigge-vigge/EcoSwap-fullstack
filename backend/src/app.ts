import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import itemRoutes from './routes/item.routes'
import messageRoutes from './routes/message.routes'
import adminRoutes from './routes/admin.routes'
import orderRoutes from './routes/order.routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Production frontend URL
  'https://eco-swap-fullstack-ggsu-git-main-vigges-projects-0s0f7962.vercel.app',
].filter(Boolean) // Remove undefined values

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // In development, allow all origins
      if (process.env.NODE_ENV === 'development') {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
const uploadsPath = process.env.NODE_ENV === 'production' ? '/tmp/uploads' : 'uploads'
app.use('/uploads', express.static(uploadsPath))

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EcoSwap API', 
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      items: '/api/items',
      messages: '/api/messages',
      admin: '/api/admin',
      orders: '/api/orders'
    }
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/orders', orderRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EcoSwap API is running' })
})

// Error handling
app.use(errorHandler)

export default app
