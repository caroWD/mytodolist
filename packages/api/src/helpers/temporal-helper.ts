import { Temporal } from 'temporal-polyfill'

export const getTemporalNow = (): Temporal.PlainDateTime =>
  Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId())

export const getTemporalFrom = (from: string): Temporal.PlainDateTime =>
  Temporal.PlainDateTime.from(from)

export const compareTemporal = (
  compare: Temporal.PlainDateTime,
  reference: Temporal.PlainDateTime
): boolean =>
  Temporal.PlainDateTime.compare(compare, reference) > 0 ? false : true
