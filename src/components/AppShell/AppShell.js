/** @flow */
import React from 'react'

import Layout from '../Layout'
import Canvas from '../Layout/components/Canvas'

type Props = {
  sections: { [string]: React.Element<*> },
  isFullscreen: boolean,
}

const AppShell = ({ sections, isFullscreen }: Props) =>
  <Layout.App
    header={sections.header}
    leftNav={sections.leftNav}
    isFullscreen={isFullscreen}
    showHeader
    showLeftNav
  >
    <Layout.LiveView
      bottomPanel={sections.bottomPanel}
      leftPanel={sections.leftPanel}
      rightPanel={sections.rightPanel}
      isFullscreen={isFullscreen}
      showBottomPanel
      showLeftPanel
      showRightPanel
    >
      <Canvas header={sections.contentPanelHeader} isFullscreen={isFullscreen}>
        {sections.content}
      </Canvas>
    </Layout.LiveView>
  </Layout.App>

export default AppShell
