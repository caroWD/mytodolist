import { DomainError } from '../../../errors'

export class BaseDescription {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): BaseDescription {
    if (value === null) throw new DomainError('The Description cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Description must be a string.')

    if (!value.trim().length)
      throw new DomainError('The Description cannot be empty.')

    if (value.trim().length < 15)
      throw new DomainError(
        'The Description must be at least 5 characters long.'
      )

    if (value.trim().length > 255)
      throw new DomainError(
        'The Description must be no more than 255 characters long.'
      )

    return new BaseDescription(value)
  }
}
