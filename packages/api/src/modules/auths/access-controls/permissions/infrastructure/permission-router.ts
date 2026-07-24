import { Router } from 'express'
import { PermissionController } from './PermissionController'

const permissionController = new PermissionController()

export const permissionRouter: Router = Router()

permissionRouter.post('/', permissionController.add)
permissionRouter.put('/', permissionController.edit)
permissionRouter.patch('/', permissionController.archive)
permissionRouter.delete('/', permissionController.remove)
permissionRouter.get('/', permissionController.findAll)
permissionRouter.get('/:id', permissionController.findOne)
