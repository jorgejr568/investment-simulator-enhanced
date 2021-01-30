const moneyFormatter = new Intl.NumberFormat('en-US', {
  // currencyDisplay: '$',
  currency: 'USD',
  style: 'currency',
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

export const AmountFloatConverter = (amount: number): number => {
  return amount / 100
}

export const AmountMoneyFormatter = (
  amount: number,
  formatter: Intl.NumberFormat = moneyFormatter
): string => {
  return formatter.format(AmountFloatConverter(amount))
}

export const AmountPercentageFormatter = (
  amount: number,
  formatter: Intl.NumberFormat = percentFormatter
): string => {
  return formatter.format(AmountFloatConverter(amount) / 100)
}
