import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

import config from './config/config.js'
config(app)

import connectDB from './db/db.config.js'
connectDB()

import authRoutes from './routes/auth.routes.js'
app.use('/', authRoutes)

import meetingRoutes from './routes/meeting.routes.js'
app.use('/', meetingRoutes)

import auth from './middlewares/auth.middleware.js'
app.use(auth)

import userRoutes from './routes/edit.user.routes.js'
app.use('/', userRoutes)

export default app
