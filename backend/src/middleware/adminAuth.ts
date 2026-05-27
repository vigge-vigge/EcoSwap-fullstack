import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth'
import prisma from '../config/database'

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    next()
  } catch (error) {
    console.error('Admin auth error:', error)
    res.status(500).json({ message: 'Error verifying admin access' })
  }
}
