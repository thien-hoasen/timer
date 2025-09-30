export function getDateTimeFormatter(
  timezone?: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat('default', {
    timeZone: timezone,
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  })
}
