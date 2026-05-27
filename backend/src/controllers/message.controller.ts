import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import prisma from '../config/database'

export const sendMessage = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { itemId, receiverId, content } = req.body
    const senderId = req.userId!

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Message content is required' })
    }

    // Verify item exists
    const item = await prisma.item.findUnique({ where: { id: itemId } })
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    // Don't allow sending messages to yourself
    if (senderId === receiverId) {
      return res.status(400).json({ message: 'Cannot send message to yourself' })
    }

    const message = await prisma.message.create({
      data: {
        itemId,
        senderId,
        receiverId,
        content: content.trim()
      },
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
            title: true
          }
        }
      }
    })

    res.status(201).json(message)
  } catch (error) {
    console.error('Error sending message:', error)
    res.status(500).json({ message: 'Error sending message' })
  }
}

export const getMyMessages = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const userId = req.userId!

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ message: 'Error fetching messages' })
  }
}

export const getConversation = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { itemId } = req.params
    const userId = req.userId!

    const messages = await prisma.message.findMany({
      where: {
        itemId,
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
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
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    res.json(messages)
  } catch (error) {
    console.error('Error fetching conversation:', error)
    res.status(500).json({ message: 'Error fetching conversation' })
  }
}

export const markAsRead = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const userId = req.userId!

    const message = await prisma.message.findUnique({ where: { id } })
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (message.receiverId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await prisma.message.update({
      where: { id },
      data: { isRead: true }
    })

    res.json({ message: 'Message marked as read' })
  } catch (error) {
    console.error('Error marking message as read:', error)
    res.status(500).json({ message: 'Error marking message as read' })
  }
}

export const getUnreadCount = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const userId = req.userId!

    const count = await prisma.message.count({
      where: {
        receiverId: userId,
        isRead: false
      }
    })

    res.json({ count })
  } catch (error) {
    console.error('Error fetching unread count:', error)
    res.status(500).json({ message: 'Error fetching unread count' })
  }
}
