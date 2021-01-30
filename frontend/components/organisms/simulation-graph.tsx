import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from 'victory'
import { SimulationCalculation } from 'client'
import { theme } from 'cfg'
import { AmountMoneyFormatter } from '../../filters'
import { VictoryLabelStyleObject } from 'victory-core'
import { CSSProperties } from 'react'

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
    amount: partial.total_amount / 100,
    y0: partial.invested_amount / 100,
    label: `Interest amount: ${AmountMoneyFormatter(partial.interest_amount)}`,
  }))

  const dataset_invested = calculation.partials.map((partial, x) => ({
    month: x + 1,
    amount: partial.invested_amount / 100,
    label: `Invested amount: ${AmountMoneyFormatter(partial.invested_amount)}`,
  }))

  const tooltipStyles: CSSProperties = {
    fontSize: '5px',
  }
  const tooltipFlyStyles: VictoryLabelStyleObject = {
    fontSize: '5px',
    stroke: `none`,
    backgroundColor: 'white',
    fill: 'white',
  }

  return (
    <VictoryChart theme={VictoryTheme.grayscale}>
      <VictoryBar
        data={dataset_invested}
        x="month"
        y="amount"
        style={{ data: { fill: theme.palette.primary.main } }}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0}
            style={tooltipStyles}
            flyoutStyle={tooltipFlyStyles}
          />
        }
      />
      <VictoryBar
        data={dataset_interest}
        x="month"
        y="amount"
        style={{ data: { fill: theme.palette.secondary.main } }}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0}
            style={tooltipStyles}
            flyoutStyle={tooltipFlyStyles}
          />
        }
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
