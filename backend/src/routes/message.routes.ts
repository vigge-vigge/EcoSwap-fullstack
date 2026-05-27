import { Router } from 'express'
import {
  sendMessage,
  getMyMessages,
  getConversation,
  markAsRead,
  getUnreadCount
} from '../controllers/message.controller'
import { auth } from '../middleware/auth'

const router = Router()

// All message routes require authentication
router.post('/', auth, sendMessage)
router.get('/', auth, getMyMessages)
router.get('/unread-count', auth, getUnreadCount)
router.get('/conversation/:itemId', auth, getConversation)
router.patch('/:id/read', auth, markAsRead)

export default router
