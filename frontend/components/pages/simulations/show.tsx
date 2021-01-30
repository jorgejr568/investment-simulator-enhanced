import { Page } from '../_page'
import { Card, CardContent, Grid, PageTitle } from 'components/atoms'
import { SimulationCalculation } from 'client'
import { SimulationGraph } from '../../organisms'

export interface IShowSimulationPageProps {
  calculation: SimulationCalculation
}
export const ShowSimulationPage = ({
  calculation,
}: IShowSimulationPageProps) => (
  <Page>
    <PageTitle component="h2" variant="h4">
      Simulation - {calculation.simulation.title}
    </PageTitle>
    <Grid container spacing={4}>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardContent>
            <SimulationGraph calculation={calculation} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={4} sm={12}>
        <Card>
          <CardContent>Will put some stats here</CardContent>
        </Card>
      </Grid>
    </Grid>
  </Page>
)
