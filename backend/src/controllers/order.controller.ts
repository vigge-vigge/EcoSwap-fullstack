import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create order (checkout)
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId, paymentMethod, buyerName, buyerEmail, buyerPhone, shippingAddress } = req.body
    const buyerId = req.userId!

    // Get item details
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: { user: true }
    })

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    if (item.isFree) {
      return res.status(400).json({ message: 'Cannot purchase free items' })
    }

    if (item.userId === buyerId) {
      return res.status(400).json({ message: 'Cannot purchase your own item' })
    }

    if (item.sold) {
      return res.status(400).json({ message: 'This item has already been sold' })
    }

    // Create order and mark item as sold
    const order = await prisma.order.create({
      data: {
        itemId,
        buyerId,
        sellerId: item.userId,
        amount: item.price!,
        paymentMethod,
        buyerName,
        buyerEmail,
        buyerPhone,
        shippingAddress,
        status: 'pending'
      },
      include: {
        item: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } }
      }
    })

    // Mark item as sold
    await prisma.item.update({
      where: { id: itemId },
      data: { sold: true }
    })

    res.status(201).json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'Failed to create order' })
  }
}

// Get my purchases
export const getMyPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const buyerId = req.userId!

    const orders = await prisma.order.findMany({
      where: { buyerId },
      include: {
        item: true,
        seller: { select: { id: true, name: true, email: true, location: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(orders)
  } catch (error) {
    console.error('Error fetching purchases:', error)
    res.status(500).json({ message: 'Failed to fetch purchases' })
  }
}

// Get my sales
export const getMySales = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.userId!

    const orders = await prisma.order.findMany({
      where: { sellerId },
      include: {
        item: true,
        buyer: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(orders)
  } catch (error) {
    console.error('Error fetching sales:', error)
    res.status(500).json({ message: 'Failed to fetch sales' })
  }
}

// Get single order
export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.userId!

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        item: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true, location: true } }
      }
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Only buyer or seller can view
    if (order.buyerId !== userId && order.sellerId !== userId) {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({ message: 'Failed to fetch order' })
  }
}

// Update order status (seller only)
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const userId = req.userId!

    // Valid status transitions
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const order = await prisma.order.findUnique({
      where: { id }
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Only seller can update status
    if (order.sellerId !== userId) {
      return res.status(403).json({ message: 'Only the seller can update order status' })
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        item: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } }
      }
    })

    res.json(updatedOrder)
  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({ message: 'Failed to update order status' })
  }
}
