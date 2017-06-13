/** @flow */
import React from 'react'
import Theme from 'js-theme'

import { Colors, Spacing } from '@workflo/styles'

import Column from './Column'
import Row from './Row'

type Props = {
  children: React.Element<*>,
  leftNav: React.Element<*>,
  header: React.Element<*>,
  showHeader: boolean,
  showLeftNav: boolean,
  theme: Object,
}

/** Layout provider for rendering an App shell with header, leftnav and content sections */
const App = ({
  children,
  header,
  leftNav,
  showHeader = true,
  showLeftNav = true,
  theme,
}: Props) => (
  <Row {...theme.container}>
    <Column {...theme.page}>
      {showHeader && header && <Row {...theme.header}>{header}</Row>}
      <Row {...theme.main}>
        {showLeftNav && leftNav && <Column {...theme.leftNav}>{leftNav}</Column>}
        <Column {...theme.content}>{children}</Column>
      </Row>
    </Column>
  </Row>
)

const MAX_WIDTH = 1200

const defaultTheme = {
  container: {
    backgroundColor: Colors.grey900,
    boxSizing: 'border-box',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: Spacing.small,
    paddingRight: Spacing.small,
    paddingTop: Spacing.small,
    width: '100%',
  },
  content: {
    flexGrow: 1,
  },
  header: {
    flexBasis: 188,
    flexShrink: 0,
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
