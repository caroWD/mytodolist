import type {
  TempoDeletedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
} from './value-objects'

export abstract class Tempo {
  private _createdAt: TempoCreatedAt
  private _updatedAt: TempoUpdatedAt
  private _archivedAt: TempoDeletedAt

  constructor(
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoDeletedAt
  ) {
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._archivedAt = archivedAt
  }

  get createdAt(): TempoCreatedAt {
    return this._createdAt
  }

  get updatedAt(): TempoUpdatedAt {
    return this._updatedAt
  }

  get archivedAt(): TempoDeletedAt {
    return this._archivedAt
  }
}
