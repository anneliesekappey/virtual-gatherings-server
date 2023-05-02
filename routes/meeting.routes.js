import { Router } from 'express'
import Meeting from '../models/meeting.model.js'

const router = Router()

router.post('/purchase-a-session-or-a-bundle', async (req, res, next) => {
  const meeting = req.body

  try {
    const newMeeting = await Meeting.create({ ...meeting })
    res.status(201).json(newMeeting)
  } catch (error) {
    next(error)
  }
})

router.get('/book-a-session', async (req, res, next) => {
  try {
    const meetings = await Meeting.find()
    res.status(200).json(meetings)
  } catch (error) {
    next(error)
  }
})

router.put('/book-a-session/:id', async (req, res, next) => {
  const { id } = req.params
  const update = req.body

  try {
    await Meeting.updateOne({ _id: id }, update)
    res.status(200).json({ message: 'Meeting successfully updated' })
  } catch (error) {
    next(error)
  }
})

router.delete('/book-a-session/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    await Meeting.findOneAndDelete({ _id: id })
    res.status(200).json({ message: 'Meeting successfully deleted' })
  } catch (error) {
    next(error)
  }
})

export default router
