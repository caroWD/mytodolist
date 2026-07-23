import type { RootId } from '../../roots'
import type { BaseName } from './value-objects'

export interface IBaseRepository<T> {
  add(entity: T): Promise<void>

  edit(entity: T): Promise<void>

  archive(id: RootId): Promise<void>

  remove(id: RootId): Promise<void>

  findAll(): Promise<T[]>

  findOne(id: RootId): Promise<T | null>

  ensureAlreadyExists(name: BaseName): Promise<boolean>
}
