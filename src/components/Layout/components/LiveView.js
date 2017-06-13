/** @flow */
import React from 'react'
import Theme from 'js-theme'

import Column from './Column'
import Row from './Row'

type Props = {
  bottomPanel: React.Element<*>,
  children: React.Element<*>,
  leftPanel: React.Element<*>,
  rightPanel: React.Element<*>,
  showLeftPanel: boolean,
  showRightPanel: boolean,
  showBottomPanel: boolean,
  theme: Object,
}

/** Layout provider for rendering a LiveView with bottomPanel, rightPanel and leftPanel sections */
const LiveView = ({
  bottomPanel,
  children,
  leftPanel,
  rightPanel,
  showBottomPanel = true,
  showLeftPanel = true,
  showRightPanel = true,
  theme,
}: Props) => (
  <Column {...theme.container}>
    <Row {...theme.middle}>
      {showLeftPanel &&
        leftPanel &&
        <Column {...theme.leftPanel}>
          {leftPanel}
        </Column>}
      <Column {...theme.content}>
        {children}
      </Column>
      {showRightPanel &&
        rightPanel &&
        <Column {...theme.rightPanel}>
          {rightPanel}
        </Column>}
    </Row>
    {showBottomPanel &&
      bottomPanel &&
      <Row {...theme.bottomPanel}>
        {bottomPanel}
      </Row>}
  </Column>
)

const defaultTheme = {
  bottomPanel: {
    flexShrink: 0,
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
