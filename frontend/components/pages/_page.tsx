import styled from 'styled-components'
import { Container } from 'components/atoms'

export const Main = styled.main`
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
`

export const Page = ({ children }) => {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  )
}
