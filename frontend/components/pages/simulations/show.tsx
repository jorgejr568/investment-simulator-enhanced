import { Page } from '../_page'
import {
  BackIcon,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  PageTitle,
  Typography,
} from 'components/atoms'
import { SimulationCalculation } from 'client'
import { SimulationGraph, SimulationLabels } from '../../organisms'
import {
  AmountMoneyFormatter,
  AmountPercentageFormatter,
} from '../../../filters'

export interface IShowSimulationPageProps {
  calculation: SimulationCalculation
}

export const ShowSimulationPage = ({
  calculation,
}: IShowSimulationPageProps) => (
  <Page>
    <PageTitle component="h2" variant="h4">
      <Link href="/" as="/" passHref>
        <BackIcon />
      </Link>{' '}
      Simulation - {calculation.simulation.title}
    </PageTitle>
    <Grid container spacing={4} alignItems="stretch">
      <Grid item xs={12} lg={12}>
        <Card className="h-100">
          <CardContent>
            <Typography variant="h3" align="center">
              Representation
            </Typography>
            <Box marginTop={8}>
              <SimulationLabels calculation={calculation} />
            </Box>
            <SimulationGraph calculation={calculation} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Page>
)
