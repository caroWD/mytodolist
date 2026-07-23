import { DomainError } from '../../../errors'

export class BaseName {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): BaseName {
    if (value === null) throw new DomainError('The Name cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Name must be a string.')

    if (!value.trim().length) throw new DomainError('The Name cannot be empty.')

    if (value.trim().length < 5)
      throw new DomainError('The Name must be at least 5 characters long.')

    if (value.trim().length > 50)
      throw new DomainError('The Name must be no more than 50 characters long.')

    return new BaseName(value.trim())
  }
}
