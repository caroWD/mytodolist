import { Router } from 'express'
import { permissionRouter, roleRouter } from './modules'

export const router: Router = Router()

router.use('/permission', permissionRouter)
router.use('/role', roleRouter)
