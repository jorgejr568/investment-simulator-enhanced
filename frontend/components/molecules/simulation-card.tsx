import { Simulation } from 'client'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MoneyIcon,
  RentabilityIcon,
  Typography,
  WorkIcon,
} from 'components/atoms'
import styled from 'styled-components'
import { AmountMoneyFormatter, AmountPercentageFormatter } from 'filters'

export interface ISimulationCardProps {
  simulation: Simulation
}

const SimulationID = styled.small`
  margin-left: 24px;
  font-size: 12px;
`

interface ISimulationListItemProps {
  icon: React.ReactNode
  info: string
  helper?: string
}
const SimulationListItem = ({
  icon,
  info,
  helper,
}: ISimulationListItemProps) => (
  <ListItem>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={info} secondary={helper} />
  </ListItem>
)
export const SimulationCard = ({ simulation }: ISimulationCardProps) => (
  <Box boxShadow={1}>
    <Card>
      <CardHeader title={simulation.title} subheader={simulation.id} />
      <CardContent>
        <List>
          <SimulationListItem
            icon={<MoneyIcon />}
            info={`Initial amount: ${AmountMoneyFormatter(
              simulation.initial_amount
            )}`}
            helper={`How much you've started with`}
          />
          <SimulationListItem
            icon={<MoneyIcon />}
            info={`Monthly amount: ${AmountMoneyFormatter(
              simulation.monthly_amount
            )}`}
            helper={`How much you gonna invest every month`}
          />
          <SimulationListItem
            icon={<RentabilityIcon />}
            info={`Monthly Rentability: ${AmountPercentageFormatter(
              simulation.monthly_rentability
            )}`}
            helper={`How much your investments gonna grow every month`}
          />
          {simulation.annual_growth > 0 && (
            <SimulationListItem
              icon={<WorkIcon />}
              info={`Yearly contribution growl: ${AmountMoneyFormatter(
                simulation.annual_growth
              )}`}
              helper={`How much your monthly contribution will growl every year`}
            />
          )}
        </List>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Box mr="auto">
            <Button color="secondary" variant="text">
              Delete
            </Button>
          </Box>

          <Box mr={3}>
            <Button color="primary" variant="outlined">
              Edit
            </Button>
          </Box>

          <Box>
            <Link href={`/simulations/${simulation.id}`}>
              <Button color="primary" variant="contained">
                Results
              </Button>
            </Link>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  </Box>
)
