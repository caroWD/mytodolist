import { DomainError } from '../../../errors'

export class RootId {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): RootId {
    if (value === null) throw new DomainError('The Id cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Id must be a string.')

    if (!value.trim().length) throw new DomainError('The Id cannot be empty.')

    if (value.trim().length !== 36)
      throw new DomainError('The Id can be up to 36 characters long.')

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )
    )
      throw new DomainError('The Id must be in UUIDv7 format.')

    return new RootId(value.trim())
  }
}
