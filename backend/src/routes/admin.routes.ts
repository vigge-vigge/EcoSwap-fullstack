import { Router } from 'express'
import { auth } from '../middleware/auth'
import { requireAdmin } from '../middleware/adminAuth'
import {
  getStats,
  getAllUsers,
  getAllItems,
  deleteUserAsAdmin,
  deleteItemAsAdmin,
  getAllMessages
} from '../controllers/admin.controller'

const router = Router()

// All admin routes require authentication AND admin role
router.get('/stats', auth, requireAdmin, getStats)
router.get('/users', auth, requireAdmin, getAllUsers)
router.get('/items', auth, requireAdmin, getAllItems)
router.get('/messages', auth, requireAdmin, getAllMessages)
router.delete('/users/:id', auth, requireAdmin, deleteUserAsAdmin)
router.delete('/items/:id', auth, requireAdmin, deleteItemAsAdmin)

export default router
