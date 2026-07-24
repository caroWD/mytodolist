import express from 'express'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middlewares'
import { router } from './router'

export const api = express()

api.use(express.json())
api.use(corsMiddleware())
api.use(cookieParser())

api.use('/api/v01', router)
