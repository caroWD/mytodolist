import { Root, RootId } from '../../roots'
import type {
  TempoCreatedAt,
  TempoDeletedAt,
  TempoUpdatedAt,
} from '../../tempos'
import type { BaseDescription, BaseName } from './value-objects'

export abstract class Base extends Root {
  private _name: BaseName
  private _description: BaseDescription

  constructor(
    id: RootId,
    name: BaseName,
    description: BaseDescription,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    deletedAt: TempoDeletedAt
  ) {
    super(id, createdAt, updatedAt, deletedAt)
    this._name = name
    this._description = description
  }

  get name(): BaseName {
    return this._name
  }

  get description(): BaseDescription {
    return this._description
  }
}
