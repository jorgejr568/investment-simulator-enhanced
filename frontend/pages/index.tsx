import { HomePage } from 'components/pages'
import { client } from 'client'
import { MetaTitle, Head } from 'components/atoms'

const Home = ({ simulations }) => (
  <>
    <Head>
      <title>{MetaTitle('Home')}</title>
    </Head>
    <HomePage simulations={simulations} />
  </>
)
export default Home

export async function getServerSideProps() {
  const simulations = await client.list()
  return { props: { simulations } }
}
