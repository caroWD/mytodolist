import { Temporal } from 'temporal-polyfill'
import { DomainError } from '../../../errors'
import { compareTemporal, getTemporalNow } from '../../../../../helpers'

export class TempoCreatedAt {
  value: Temporal.PlainDateTime

  private constructor(value: Temporal.PlainDateTime) {
    this.value = value
  }

  public static create(value: Temporal.PlainDateTime): TempoCreatedAt {
    if (value === null)
      throw new DomainError('The creation date cannot be null.')

    if (!(value instanceof Temporal.PlainDateTime))
      throw new DomainError(
        'The creation date must be a Temporal.PlainDateTime object.'
      )

    if (!compareTemporal(value, getTemporalNow()))
      throw new DomainError('The creation date cannot be in the future.')

    return new TempoCreatedAt(value)
  }
}
