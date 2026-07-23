import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const api = express()

api.use(express.json())
api.use(cors())
api.use(cookieParser())

api.get('/', (_, res) => res.send('Hello world!'))
