import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import prisma from '../config/database'

export const getStats = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const [totalUsers, totalItems, totalMessages, recentUsers, recentItems] = await Promise.all([
      prisma.user.count(),
      prisma.item.count(),
      prisma.message.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          createdAt: true,
          _count: {
            select: {
              items: true,
              sentMessages: true
            }
          }
        }
      }),
      prisma.item.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
    ])

    const categoryCounts = await prisma.item.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    })

    res.json({
      totalUsers,
      totalItems,
      totalMessages,
      recentUsers,
      recentItems,
      categoryCounts
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    res.status(500).json({ message: 'Error fetching stats' })
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            items: true,
            sentMessages: true,
            receivedMessages: true
          }
        }
      }
    })

    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Error fetching users' })
  }
}

export const getAllItems = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            location: true
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      }
    })

    res.json(items)
  } catch (error) {
    console.error('Error fetching all items:', error)
    res.status(500).json({ message: 'Error fetching items' })
  }
}

export const deleteUserAsAdmin = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params

    await prisma.user.delete({
      where: { id }
    })

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ message: 'Error deleting user' })
  }
}

export const deleteItemAsAdmin = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params

    await prisma.item.delete({
      where: { id }
    })

    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    res.status(500).json({ message: 'Error deleting item' })
  }
}

export const getAllMessages = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        item: {
          select: {
            id: true,
            title: true,
            imageUrl: true
          }
        }
      }
    })

    res.json(messages)
  } catch (error) {
    console.error('Error fetching all messages:', error)
    res.status(500).json({ message: 'Error fetching messages' })
  }
}
