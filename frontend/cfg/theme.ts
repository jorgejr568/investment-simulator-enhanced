import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { createGlobalStyle } from 'styled-components'
import { green, grey, lightBlue, red, yellow } from '@material-ui/core/colors'

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      background: {},
      primary: {
        main: grey[800],
      },
      error: {
        main: red[600],
        contrastText: '#fff',
      },
      warning: {
        main: yellow[700],
      },
      success: {
        main: green[600],
      },
    },
    typography: {
      subtitle2: {
        fontSize: '11px',
      },
    },
    spacing: (factor) => `${factor * 4}px`,
    overrides: {
      MuiCardActions: {
        root: {
          padding: '24px 12px',
          borderTop: `1px solid ${grey[300]}`,
        },
      },
    },
  })
)

export const GlobalStyle = createGlobalStyle`
  
  body {
    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
