import { Head, MetaTitle } from 'components/atoms'
import {
  IShowSimulationPageProps,
  ShowSimulationPage,
} from 'components/pages/simulations'
import { GetServerSidePropsContext } from 'next'
import { client } from '../../client'
import { constants } from 'http2'

const ShowSimulation = ({ calculation }: IShowSimulationPageProps) => (
  <>
    <Head>
      <title>{MetaTitle(`Simulation ${calculation.simulation.id}`)}</title>
    </Head>
    <ShowSimulationPage calculation={calculation} />
  </>
)
export default ShowSimulation

export async function getServerSideProps({
  res,
  params,
}: GetServerSidePropsContext) {
  const { id } = params
  try {
    if (typeof id === 'string') {
      const calculation = await client.calculate(id)
      return { props: { calculation } }
    }
    throw Error('Simulation not found')
  } catch (e) {
    res.statusCode = constants.HTTP_STATUS_NOT_FOUND
    res.setHeader('Location', '/')
  }
  return { props: { calculation: {} } }
}
