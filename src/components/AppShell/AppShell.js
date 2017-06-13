/** @flow */
import React from 'react'

import Layout from '../Layout'

type Props = {
  sections: { [string]: React.Element<*> },
}

const AppShell = ({ sections }: Props) => (
  <Layout.App header={sections.header} leftNav={sections.leftNav} showHeader showLeftNav>
    <Layout.LiveView
      bottomPanel={sections.bottomPanel}
      leftPanel={sections.leftPanel}
      rightPanel={sections.rightPanel}
      showBottomPanel
      showLeftPanel
      showRightPanel
    >
      {sections.content}
    </Layout.LiveView>
  </Layout.App>
)

export default AppShell
