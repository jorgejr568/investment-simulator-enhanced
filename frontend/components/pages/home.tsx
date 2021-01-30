import { Page } from './_page'
import { Fab, PageTitle, RentabilityIcon } from 'components/atoms'
import { Simulation } from 'client'
import { HomeSimulations } from 'components/organisms'
import { AddSimulationFab } from '../molecules'

export interface IHomePageProps {
  simulations: Simulation[]
}
export const HomePage = ({ simulations }: IHomePageProps) => (
  <Page>
    <PageTitle>Welcome dude</PageTitle>
    <HomeSimulations simulations={simulations} />
    <AddSimulationFab />
  </Page>
)
