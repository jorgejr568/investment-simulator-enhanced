import { Simulation, SimulationPartial } from 'client'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from 'components/atoms'
import {
  AmountMoneyFormatter,
  AmountPercentageFormatter,
  DateFormatter,
  NewDateFormatter,
} from 'filters'
import { addMonths as dtAddMonths } from 'date-fns'

export interface IShowSimulationPartialsTable {
  simulation: Simulation
}

interface IRow {
  partial: SimulationPartial
  date: Date
}

const addMonths = (initial: Date, months: number = 0): Date =>
  dtAddMonths(initial, months)

const dateFormatter = NewDateFormatter({
  month: 'long',
  year: 'numeric',
})

const Row = ({ date, partial }: IRow) => {
  return (
    <TableRow>
      <TableCell>{DateFormatter(date, dateFormatter)}</TableCell>
      <TableCell align="center">
        <strong>{AmountMoneyFormatter(partial.amount)}</strong>
      </TableCell>
      <TableCell align="center">
        {AmountPercentageFormatter(partial.rentability)}
      </TableCell>
    </TableRow>
  )
}
export const ShowSimulationPartialsTable = ({
  simulation,
}: IShowSimulationPartialsTable) => (
  <TableContainer>
    <Table stickyHeader style={{ maxHeight: '200px' }}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="center">Month investment amount</TableCell>
          <TableCell align="center">Month rentability expected</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {simulation.partials.map((partial, i) => {
          console.log(simulation.created_at)
          return (
            <Row
              partial={partial}
              key={i}
              date={addMonths(new Date(simulation.created_at), i)}
            />
          )
        })}
      </TableBody>
    </Table>
  </TableContainer>
)
