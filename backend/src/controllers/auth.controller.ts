import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database'

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, email, password, phone, location } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        location
      }
    })

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    })

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Error registering user' })
  }
}

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    console.log('Login attempt:', { email: req.body.email })
    const { email, password } = req.body

    if (!email || !password) {
      console.log('Missing email or password')
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      console.log('User not found:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    console.log('User found:', { id: user.id, email: user.email })

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      console.log('Invalid password for user:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    console.log('Password valid, generating token')

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    })

    console.log('Login successful for:', email)

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Error logging in' })
  }
}
