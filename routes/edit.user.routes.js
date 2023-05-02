import { Router } from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/user', async (req, res, next) => {
  const user = req.user
  try {
    const userFound = await User.findById(user.id)
    res
      .status(200)
      .json({ username: userFound.username, email: userFound.email })
  } catch (error) {
    next(error)
  }
})

router.put('/user/edit-username', async (req, res, next) => {
  const { id } = req.user
  const { username } = req.body
  try {
    const modifiedUser = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    )
    res.status(200).json(modifiedUser)
  } catch (error) {
    next(error)
  }
})

router.put('/user/edit-password', async (req, res, next) => {
  const { id } = req.user
  const { password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)

  try {
    const modifiedUser = await User.findByIdAndUpdate(
      id,
      { passwordHash },
      { new: true }
    )
    res.status(200).json(modifiedUser)
  } catch (error) {
    next(error)
  }
})

export default router
