import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const Typo = styled(Typography).attrs((props) => ({
  variant: 'h2',
  component: 'h1',
  color: 'textPrimary',
  ...props,
}))`
  && {
    margin-top: ${({ theme: { spacing } }) => spacing(2)};
    margin-bottom: ${({ theme: { spacing } }) => spacing(3)};
  }
`
export const PageTitle = ({ children, ...props }) => (
  <Typo {...props}>{children}</Typo>
)
