import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory'
import { SimulationCalculation } from 'client'
import { theme } from 'cfg'

export interface ISimulationGraphProps {
  calculation: SimulationCalculation
}
export const SimulationGraph = ({ calculation }: ISimulationGraphProps) => {
  const dataset_total = calculation.partials.map((partial, x) => ({
    month: x + 1,
    amount: partial.total_amount / 100,
  }))

  const dataset_interest = calculation.partials.map((partial, x) => ({
    month: x + 1,
    amount: partial.interest_amount / 100,
  }))

  const dataset_invested = calculation.partials.map((partial, x) => ({
    month: x + 1,
    amount: partial.total_amount / 100,
    y0: dataset_interest[x].amount,
  }))

  return (
    <VictoryChart theme={VictoryTheme.grayscale}>
      <VictoryBar
        data={dataset_invested}
        x="month"
        y="amount"
        style={{ data: { fill: theme.palette.primary.main } }}
      />
      <VictoryBar
        data={dataset_interest}
        x="month"
        y="amount"
        style={{ data: { fill: theme.palette.secondary.main } }}
      />

      <VictoryAxis
        dependentAxis
        tickFormat={(x) => {
          let amount = x / 1000
          if (amount < 1000) {
            return `$${amount}k`
          }
          amount /= 1000
          return `$${amount}M`
        }}
        style={{
          tickLabels: { fontSize: '9px' },
          axis: { stroke: 'none' },
          grid: { stroke: theme.palette.grey[500], strokeDasharray: '5' },
        }}
      />
    </VictoryChart>
  )
}
