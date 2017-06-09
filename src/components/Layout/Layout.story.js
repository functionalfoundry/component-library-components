/** @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Colors } from '@workflo/styles'

import Button from '../Button'
import Layout from './'

const fillParent = { flexGrow: 1 }

/** Renders Layout.App with placeholder content */
const AppShell = ({ children, ...props }: { children?: React.Element<*> }) => (
  <Layout.App
    {...props}
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

/** Renders Layout.LiveView with placeholder content */
const LiveViewShell = ({ children, ...props }: { children?: React.Element<*> }) => (
  <Layout.LiveView
    {...props}
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

/**
 * Container for showing how sections can be toggled with the Layout.App and
 * Layout.LiveView components.
 */
class LiveViewToggleContainer extends React.Component {
  Props: {}
  State: {
    chrome: number,
  }
  constructor(props) {
    super(props)
    this.state = {
      chrome: 0,
    }
  }

  handleToggle = props => {
    this.setState(prevState => ({ chrome: (prevState.chrome + 1) % 3 }))
  }

  render(props) {
    return (
      <AppShell
        showLeftNav={this.state.chrome === 0}
        showHeader={this.state.chrome === 0}
      >
        <LiveViewShell
          showBottomPanel={this.state.chrome !== 2}
          showLeftPanel={this.state.chrome !== 2}
          showRightPanel={this.state.chrome !== 2}
        >
          <div style={{ ...fillParent }}>
            <Button onClick={this.handleToggle} style={{ height: 50, width: 150 }}>
              Toggle Chrome
            </Button>
            Mode: {this.state.chrome}
          </div>
        </LiveViewShell>
      </AppShell>
    )
  }
}

storiesOf('Layout', module)
  .add('App', () => <AppShell><ContentPlaceholder /></AppShell>)
  .add('LiveView', () => (
    <AppShell>
      <LiveViewShell>
        <ContentPlaceholder />
      </LiveViewShell>
    </AppShell>
  ))
  .add('Toggle LiveView Chrome', () => <LiveViewToggleContainer />)
