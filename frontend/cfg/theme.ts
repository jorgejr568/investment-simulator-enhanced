import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { createGlobalStyle } from 'styled-components'
import {
  green,
  grey,
  indigo,
  lightBlue,
  orange,
  red,
  yellow,
} from '@material-ui/core/colors'

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      background: {},
      primary: {
        main: indigo[800],
      },
      secondary: {
        main: orange[900],
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
      MuiChip: {
        root: {
          fontSize: '1.2rem',
          padding: '1.2rem .5rem',
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
  
  .h-100{
    height: 100%;
  }
`
