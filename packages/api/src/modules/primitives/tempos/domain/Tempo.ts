import type {
  TempoDeletedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
} from './value-objects'

export abstract class Tempo {
  private _createdAt: TempoCreatedAt
  private _updatedAt: TempoUpdatedAt
  private _deletedAt: TempoDeletedAt

  constructor(
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    deletedAt: TempoDeletedAt
  ) {
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._deletedAt = deletedAt
  }

  get createdAt(): TempoCreatedAt {
    return this._createdAt
  }

  get updatedAt(): TempoUpdatedAt {
    return this._updatedAt
  }

  get deletedAt(): TempoDeletedAt {
    return this._deletedAt
  }
}
