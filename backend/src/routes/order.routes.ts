import { Router } from 'express'
import { auth } from '../middleware/auth'
import { createOrder, getMyPurchases, getMySales, getOrder, updateOrderStatus } from '../controllers/order.controller'

const router = Router()

router.post('/', auth, createOrder)
router.get('/purchases', auth, getMyPurchases)
router.get('/sales', auth, getMySales)
router.get('/:id', auth, getOrder)
router.patch('/:id/status', auth, updateOrderStatus)

export default router
