import { Temporal } from 'temporal-polyfill'
import { compareTemporal, getTemporalNow } from '../../../../../helpers'
import { DomainError } from '../../../errors'

export class TempoUpdatedAt {
  value: Temporal.PlainDateTime

  private constructor(value: Temporal.PlainDateTime) {
    this.value = value
  }

  public static create(value: Temporal.PlainDateTime): TempoUpdatedAt {
    if (value === null) throw new DomainError('The update date cannot be null.')

    if (!(value instanceof Temporal.PlainDateTime))
      throw new DomainError(
        'The update date must be a Temporal.PlainDateTime object.'
      )

    if (!compareTemporal(value, getTemporalNow()))
      throw new DomainError('The update date cannot be in the future.')

    return new TempoUpdatedAt(value)
  }
}
