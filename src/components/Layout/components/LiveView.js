import React from 'react'
import Theme from 'js-theme'

import { Colors } from '@workflo/styles'

import Column from './Column'
import Row from './Row'

type Props = {
  bottomPanel: React.Element,
  children: React.Element,
  leftPanel: React.Element,
  rightPanel: React.Element,
  theme: Object,
}

const LiveView = ({ bottomPanel, children, leftPanel, rightPanel, theme }: Props) => (
  <Column {...theme.container}>
    <Row {...theme.middle}>
      <Column {...theme.leftPanel}>
        {leftPanel}
      </Column>
      <Column {...theme.content}>
        {children}
      </Column>
      <Column {...theme.rightPanel}>
        {rightPanel}
      </Column>
    </Row>
    <Row {...theme.bottomPanel}>
      {bottomPanel}
    </Row>
  </Column>
)

const defaultTheme = {
  bottomPanel: {
    flexBasis: 400,
  },
  container: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  leftPanel: {
    flexBasis: 300,
  },
  rightPanel: {
    flexBasis: 400,
  },
  middle: {
    flexGrow: 1,
  },
}

export default Theme('LiveView', defaultTheme)(LiveView)
