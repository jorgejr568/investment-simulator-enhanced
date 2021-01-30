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

  const dataset_invested = calculation.partials.map((partial, x) => ({
    month: x + 1,
    amount: partial.invested_amount / 100,
  }))
  const dataset_interest = calculation.partials.map((partial, x) => ({
    month: x + 1,
    amount: partial.interest_amount / 100,
  }))

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        data={dataset_total}
        x="month"
        y="amount"
        interpolation="natural"
        style={{ data: { stroke: theme.palette.grey['500'] } }}
      />
      <VictoryLine
        data={dataset_interest}
        x="month"
        y="amount"
        interpolation="natural"
        style={{ data: { stroke: theme.palette.success.main } }}
      />

      <VictoryLine
        data={dataset_invested}
        x="month"
        y="amount"
        interpolation="natural"
        style={{ data: { stroke: theme.palette.secondary.main } }}
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
        style={{ tickLabels: { fontSize: '9px' } }}
      />
    </VictoryChart>
  )
}
