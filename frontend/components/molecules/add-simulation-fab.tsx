import styled from 'styled-components'
import { Fab, RentabilityIcon, Tooltip } from 'components/atoms'

export const FixedFab = styled(Fab)`
  && {
    position: fixed;
    bottom: ${({ theme }) => theme.spacing(4)};
    right: ${({ theme }) => theme.spacing(4)};
  }
`
export const AddSimulationFab = () => (
  <Tooltip title="Create a new simulation" placement="left">
    <FixedFab color="primary">
      <RentabilityIcon />
    </FixedFab>
  </Tooltip>
)
