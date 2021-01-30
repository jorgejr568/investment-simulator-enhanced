import { SimulationCalculation } from 'client'
import { Label } from '@material-ui/icons'
import { AmountMoneyFormatter, AmountPercentageFormatter } from '../../filters'
import { Chip, Grid } from '../atoms'
import { PropTypes } from '@material-ui/core'

export interface ISimulationLabelsProps {
  calculation: SimulationCalculation
}

interface Label {
  content: string
  variant: 'default' | 'outlined'
  color: Exclude<PropTypes.Color, 'inherit'>
}

const makeLabel = ({ content, variant, color }: Label): Label => ({
  content,
  variant,
  color,
})

export const SimulationLabels = ({ calculation }: ISimulationLabelsProps) => {
  const labels: Label[] = [
    makeLabel({
      content: `Invested amount: ${AmountMoneyFormatter(
        calculation.stats.invested_amount
      )} / ${AmountPercentageFormatter(calculation.stats.invested_percentage)}`,
      color: 'primary',
      variant: 'outlined',
    }),
    makeLabel({
      content: `Total amount: ${AmountMoneyFormatter(
        calculation.stats.total_amount
      )}`,
      color: 'primary',
      variant: 'default',
    }),
    makeLabel({
      content: `Interest amount: ${AmountMoneyFormatter(
        calculation.stats.interest_amount
      )} / ${AmountPercentageFormatter(calculation.stats.interest_percentage)}`,
      color: 'primary',
      variant: 'outlined',
    }),
  ]
  return (
    <Grid container justify="space-around">
      {labels.map(({ content, color, variant }, key) => (
        <Chip label={content} color={color} variant={variant} key={key} />
      ))}
    </Grid>
  )
}
