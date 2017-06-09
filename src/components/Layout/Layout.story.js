import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Colors } from '@workflo/styles'

import Layout from './'

const fillParent = { flexGrow: 1 }

const AppShell = ({ children }: { children: React.Element }) => (
  <Layout.App
    theme={{
      container: {
        color: 'white',
      },
    }}
    header={
      <div style={{ backgroundColor: Colors.primary800, ...fillParent }}>
        Header
      </div>
    }
    leftNav={
      <div style={{ backgroundColor: Colors.primary900, ...fillParent }}>
        Left Nav
      </div>
    }
  >
    {children}
  </Layout.App>
)

const LiveViewShell = ({ children }: { children: React.Element }) => (
  <Layout.LiveView
    rightPanel={
      <div style={{ backgroundColor: Colors.red700, ...fillParent }}>Right Panel</div>
    }
    leftPanel={
      <div style={{ backgroundColor: Colors.red800, ...fillParent }}>Left Panel</div>
    }
    bottomPanel={
      <div style={{ backgroundColor: Colors.red900, ...fillParent }}>Bottom Panel</div>
    }
  >
    {children}
  </Layout.LiveView>
)

const ContentPlaceholder = () => (
  <div style={{ backgroundColor: Colors.red200, ...fillParent }}>
    Content
  </div>
)

storiesOf('Layout', module)
  .add('App', () => <AppShell><ContentPlaceholder /></AppShell>)
  .add('LiveView', () => (
    <AppShell>
      <LiveViewShell>
        <ContentPlaceholder />
      </LiveViewShell>
    </AppShell>
  ))
