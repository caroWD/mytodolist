import type { NextFunction, Request, Response } from 'express'
import type { BaseRequest, BaseResponse, IdRequest } from '../../../../../types'
import { serviceContainer } from '../../../../../shared/service-container'
import type { PermissionDto } from '../domain'

export class PermissionController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.accessControl.permission.add(req.body)

      res
        .status(201)
        .json({ message: 'Permission added successfully!', status: true })

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
      await serviceContainer.auth.accessControl.permission.edit(req.body)

      res
        .status(200)
        .json({ message: 'Permission edited successfully!', status: true })

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
      await serviceContainer.auth.accessControl.permission.archive(req.body)

      res.status(200).json({
        message: 'Permission toggled successfully!',
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
      await serviceContainer.auth.accessControl.permission.remove(req.body)

      res
        .status(200)
        .json({ message: 'Permission removed successfully!', status: true })

      return
    } catch (error) {
      next(error)
    }
  }

  async findAll(
    _: Request,
    res: Response<PermissionDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const permissions =
        await serviceContainer.auth.accessControl.permission.findAll()

      res.status(200).json(permissions)

      return
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdRequest>,
    res: Response<PermissionDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const permission =
        await serviceContainer.auth.accessControl.permission.findOne(req.params)

      res.status(200).json(permission)

      return
    } catch (error) {
      next(error)
    }
  }
}
