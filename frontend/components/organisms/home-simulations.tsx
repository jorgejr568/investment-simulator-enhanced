import styled from 'styled-components'
import { Simulation } from 'client'
import { SimulationCard } from 'components/molecules'
import { Grid } from 'components/atoms'
import { sortBy, orderBy } from 'lodash'

export interface IHomeSimulationsProps {
  simulations: Simulation[]
}

const Wrapper = styled.section``
Wrapper.SimulationCard = styled.article`
  margin-top: ${({ theme: { spacing } }) => spacing(5)};
`

export const HomeSimulations = ({ simulations }: IHomeSimulationsProps) => {
  return (
    <Wrapper>
      <Grid container spacing={4} justify="space-between" alignItems="stretch">
        {orderBy(simulations, 'title').map((simulation, key) => (
          <Grid lg={4} md={4} sm={6} xs={12} item key={key}>
            <Wrapper.SimulationCard>
              <SimulationCard simulation={simulation} />
            </Wrapper.SimulationCard>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}
