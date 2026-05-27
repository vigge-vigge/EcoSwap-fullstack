import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import prisma from '../config/database'

export const getAllItems = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { location, category } = req.query

    const where: any = {
      sold: false  // Only show items that haven't been sold
    }
    if (location) {
      where.location = { contains: location as string, mode: 'insensitive' }
    }
    if (category) {
      where.category = category as string
    }

    const items = await prisma.item.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      }
    })

    res.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).json({ message: 'Error fetching items' })
  }
}

export const getItemById = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params

    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            location: true
          }
        }
      }
    })

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    res.status(500).json({ message: 'Error fetching item' })
  }
}

export const createItem = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { title, description, category, condition, isFree, price, location } = req.body
    const userId = req.userId!

    console.log('Creating item for user:', userId, { title, category, isFree })

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined

    const item = await prisma.item.create({
      data: {
        userId,
        title,
        description,
        category,
        condition,
        isFree: isFree === 'true' || isFree === true,
        price: isFree ? null : parseFloat(price),
        location,
        imageUrl
      }
    })

    console.log('Item created successfully:', item.id)
    res.status(201).json(item)
  } catch (error) {
    console.error('Error creating item:', error)
    res.status(500).json({ message: 'Error creating item' })
  }
}

export const updateItem = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const userId = req.userId!
    const { title, description, category, condition, isFree, price, location } = req.body

    // Check if item exists and belongs to user
    const existingItem = await prisma.item.findUnique({ where: { id } })
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found' })
    }
    if (existingItem.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this item' })
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : existingItem.imageUrl

    const item = await prisma.item.update({
      where: { id },
      data: {
        title,
        description,
        category,
        condition,
        isFree: isFree === 'true' || isFree === true,
        price: isFree ? null : parseFloat(price),
        location,
        imageUrl
      }
    })

    res.json(item)
  } catch (error) {
    console.error('Error updating item:', error)
    res.status(500).json({ message: 'Error updating item' })
  }
}

export const deleteItem = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const userId = req.userId!

    // Check if item exists and belongs to user
    const existingItem = await prisma.item.findUnique({ where: { id } })
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found' })
    }
    if (existingItem.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this item' })
    }

    await prisma.item.delete({ where: { id } })

    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    res.status(500).json({ message: 'Error deleting item' })
  }
}

export const getMyItems = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const userId = req.userId!
    console.log('Fetching items for user:', userId)

    const items = await prisma.item.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    console.log(`Found ${items.length} items for user ${userId}`)
    res.json(items)
  } catch (error) {
    console.error('Error fetching user items:', error)
    res.status(500).json({ message: 'Error fetching your items' })
  }
}
