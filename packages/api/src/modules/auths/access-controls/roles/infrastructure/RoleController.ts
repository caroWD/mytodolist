import type { NextFunction, Request, Response } from 'express'
import type {
  BaseRequest,
  BaseResponse,
  IdRequest,
  RolePermissionRequest,
} from '../../../../../types'
import { serviceContainer } from '../../../../../shared/service-container'
import type { RoleDto } from '../domain'
import type { PermissionDto } from '../../permissions'

export class RoleController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.role.add(req.body)

      res
        .status(201)
        .json({ message: 'Role added successfully!', status: true })

      return
    } catch (error) {
      next(error)
    }
  }

  async addPermission(
    req: Request<RolePermissionRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.role.addPermission(req.body)

      res.status(201).json({
        message: 'Permission added to Role successfully!',
        status: true,
      })

      return
    } catch (error) {
      next(error)
    }
  }

  async archive(
    req: Request<IdRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.role.archive(req.body)

      res
        .status(200)
        .json({ message: 'Role toggled successfully!', status: true })

      return
    } catch (error) {
      next(error)
    }
  }

  async edit(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.role.edit(req.body)

      res
        .status(200)
        .json({ message: 'Role edited successfully!', status: true })

      return
    } catch (error) {
      next(error)
    }
  }

  async findAll(
    _: Request,
    res: Response<RoleDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const roles = await serviceContainer.auth.accessControl.role.findAll()

      res.status(200).json(roles)

      return
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdRequest>,
    res: Response<RoleDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const roles = await serviceContainer.auth.accessControl.role.findOne(
        req.params
      )

      res.status(200).json(roles)

      return
    } catch (error) {
      next(error)
    }
  }

  async findPermissions(
    req: Request<IdRequest>,
    res: Response<PermissionDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const permissions =
        await serviceContainer.auth.accessControl.role.findPermissions(
          req.params
        )

      res.status(200).json(permissions)

      return
    } catch (error) {
      next(error)
    }
  }

  async removePermission(
    req: Request<RolePermissionRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.role.removePermission(req.body)

      res.status(200).json({
        message: 'Permission removed to Role successfully!',
        status: true,
      })

      return
    } catch (error) {
      next(error)
    }
  }

  async remove(
    req: Request<IdRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.role.remove(req.body)

      res
        .status(200)
        .json({ message: 'Role removed successfully!', status: true })

      return
    } catch (error) {
      next(error)
    }
  }
}
