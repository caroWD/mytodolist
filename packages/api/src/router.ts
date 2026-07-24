import { Router } from 'express'
import { permissionRouter } from './modules'

export const router: Router = Router()

router.use('/permission', permissionRouter)
