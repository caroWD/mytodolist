import {
  Base,
  BaseDescription,
  BaseName,
  RootId,
  TempoCreatedAt,
  TempoDeletedAt,
  TempoUpdatedAt,
} from '../../../../../primitives'

export class Role extends Base {
  constructor(
    id: RootId,
    name: BaseName,
    description: BaseDescription,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    deletedAt: TempoDeletedAt
  ) {
    super(id, name, description, createdAt, updatedAt, deletedAt)
  }
}
