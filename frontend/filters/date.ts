const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const DateFormatter = (
  date: Date,
  formatter: Intl.DateTimeFormat = dateFormatter
): string => {
  return formatter.format(date)
}
