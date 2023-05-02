import { Router } from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body

  if (!firstName || !lastName || !username || !email || !password) {
    res
      .status(400)
      .json({ message: 'Provide the essential information please' })
    return
  }

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Please provide a valid email address' })
    return
  }

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/

  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must contain at least 6 characters, one number, one upper case letter, and one special character.',
    })
    return
  }

  try {
    const userRegistered = await User.findOne({ email })
    if (userRegistered) {
      res.status(400).json({ message: 'User already registered' })
      return
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      passwordHash,
    })
    const { _id } = newUser
    res.status(201).json({ firstName, lastName, username, email, _id })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({ message: 'User not found' })
      return
    }

    const compareHash = bcrypt.compareSync(password, user.passwordHash)
    if (!compareHash) {
      res.status(400).json({ message: 'Invalid password' })
      return
    }

    const payload = {
      id: user._id,
      username: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ ...payload, token })
  } catch (error) {
    next(error)
  }
})

export default router
