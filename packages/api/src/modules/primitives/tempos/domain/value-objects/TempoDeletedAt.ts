import { Temporal } from 'temporal-polyfill'
import { DomainError } from '../../../errors'
import { compareTemporal, getTemporalNow } from '../../../../../helpers'

export class TempoDeletedAt {
  value: Temporal.PlainDateTime | null

  private constructor(value: Temporal.PlainDateTime | null) {
    this.value = value
  }

  public static create(value: Temporal.PlainDateTime | null): TempoDeletedAt {
    if (value !== null) {
      if (!(value instanceof Temporal.PlainDateTime))
        throw new DomainError(
          'The delation date must be a Temporal.PlainDateTime object.'
        )

      if (!compareTemporal(value, getTemporalNow()))
        throw new DomainError('The delation date cannot be in the future.')
    }
    return new TempoDeletedAt(value)
  }
}
