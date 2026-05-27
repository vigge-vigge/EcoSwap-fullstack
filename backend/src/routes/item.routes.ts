import { Router } from 'express'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getMyItems
} from '../controllers/item.controller'
import { auth } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = Router()

// Protected routes (must come before /:id to avoid conflict)
router.get('/my-items', auth, getMyItems)
router.post('/', auth, upload.single('image'), createItem)
router.put('/:id', auth, upload.single('image'), updateItem)
router.delete('/:id', auth, deleteItem)

// Public routes
router.get('/', getAllItems)
router.get('/:id', getItemById)

export default router
