import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

type Props = {
  children: React.Element,
  leftNav: React.Element,
  header: React.Element,
  theme: Object,
}

const Column = ({ children, ...props }: { children: React.Element }) => (
  <div {...props} style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
)

const Row = ({ children, ...props }: { children: React.Element }) => (
  <div {...props} style={{ display: 'flex', flexDirection: 'row' }}>{children}</div>
)

const App = ({ children, header, leftNav, theme }: Props) => (
  <Row {...theme.container}>
    <Column {...theme.page}>
      <Row {...theme.header}>{header}</Row>
      <Row {...theme.main}>
        <Column {...theme.leftNav}>{leftNav}</Column>
        <Column {...theme.content}>{children}</Column>
      </Row>
    </Column>
  </Row>
)

const MAX_WIDTH = 1200

const defaultTheme = {
  container: {
    backgroundColor: Colors.grey900,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flexGrow: 1,
  },
  header: {
    flexBasis: 100,
  },
  leftNav: {
    flexBasis: 250,
  },
  main: {
    flexGrow: 1,
  },
  page: {
    flexGrow: 1,
    maxWidth: MAX_WIDTH,
  },
}

export default Theme('App', defaultTheme)(App)
