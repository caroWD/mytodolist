import { Router } from 'express'
import { RoleController } from './RoleController'

const roleController = new RoleController()

export const roleRouter: Router = Router()

roleRouter.post('/', roleController.add)
roleRouter.post('/permission', roleController.addPermission)
roleRouter.put('/', roleController.edit)
roleRouter.patch('/', roleController.archive)
roleRouter.delete('/', roleController.remove)
roleRouter.delete('/permission', roleController.removePermission)
roleRouter.get('/', roleController.findAll)
roleRouter.get('/:id', roleController.findOne)
roleRouter.get('/:id/permission', roleController.findPermissions)
