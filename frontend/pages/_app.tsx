import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'cfg'
import { MuiThemeProvider } from '@material-ui/core'
import { Head, MetaTitle } from 'components/atoms'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{MetaTitle()}</title>
      </Head>
      <GlobalStyle />
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}
