import {
  Tempo,
  TempoCreatedAt,
  TempoDeletedAt,
  TempoUpdatedAt,
} from '../../tempos'
import type { RootId } from './value-objects'

export abstract class Root extends Tempo {
  private _id: RootId

  constructor(
    id: RootId,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    deletedAt: TempoDeletedAt
  ) {
    super(createdAt, updatedAt, deletedAt)
    this._id = id
  }

  get id(): RootId {
    return this._id
  }
}
