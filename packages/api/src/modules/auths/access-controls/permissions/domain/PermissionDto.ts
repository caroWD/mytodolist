export class PermissionDto {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }
}
