import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const config = (app) => {
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(cors())
}

export default config
