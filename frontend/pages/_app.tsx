import NextApp from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'cfg'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Head, MetaTitle } from 'components/atoms'

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }

  render() {
    const { Component, pageProps } = this.props
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
}
