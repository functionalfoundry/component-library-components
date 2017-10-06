import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import App from './App'
import { liveViewState } from '../../../mocks/live-view'
import { TreeEditorContainer, regularTree } from '../../../mocks/componentTreeEditor'
import { componentTree, dataCode, actionsCode } from '../../../mocks/components'
import Properties from '../Properties'
import Header from '../Header'
import QuickAction from '../QuickAction'
import LivePreview from '../LivePreview'
import LiveEditor from '../LiveEditor'
import { Colors, Fonts } from '@workflo/styles'

class AppScrollTopContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { screen: 'Initial screen' }
  }

  handleChangeScreen = () => {
    this.setState(state => {
      state.screen =
        state.screen === 'Initial screen' ? 'Second screen' : 'Initial screen'
      return state
    })
  }

  render() {
    return (
      <App
        screen={this.state.screen}
        theme={{
          centerContainer: {
            height: 1000,
            flex: '1',
          },
        }}
        sections={{
          header: {
            element: (
              <div style={{ backgroundColor: Colors.red400, height: 100 }}>
                {this.state.screen}
              </div>
            ),
          },
          centerLeft: {
            element: (
              <div style={{ backgroundColor: Colors.red600, flex: 1 }}>Content</div>
            ),
          },
          bottom: {
            element: (
              <div style={{ backgroundColor: Colors.red700, height: 100 }}>
                <button onClick={this.handleChangeScreen}>Change screen</button>
              </div>
            ),
          },
        }}
      />
    )
  }
}

storiesOf('App', module)
  .add('Header and Content', () =>
    <App
      sections={{
        header: {
          element: (
            <div style={{ backgroundColor: Colors.red600, height: 100 }}>Header</div>
          ),
        },
        centerLeft: {
          element: (
            <div style={{ backgroundColor: Colors.red400, height: 400 }}>Content</div>
          ),
        },
      }}
    />
  )
  .add('Left and Right Center', () =>
    <App
      sections={{
        header: {
          element: (
            <div style={{ backgroundColor: Colors.red400, height: 100 }}>Header</div>
          ),
        },
        centerLeft: {
          element: (
            <div style={{ backgroundColor: Colors.red600, height: 400 }}>Left</div>
          ),
        },
        centerRight: {
          element: (
            <div style={{ backgroundColor: Colors.primary300, height: 400 }}>Right</div>
          ),
        },
        bottom: {
          element: (
            <div style={{ backgroundColor: Colors.green300, height: 300 }}>Bottom</div>
          ),
        },
      }}
    />
  )
  .add('Scroll top animation', () => <AppScrollTopContainer />)

const MyComponent = () =>
  <div
    style={{
      backgroundColor: 'magenta',
      height: 50,
      width: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      ...Fonts.base,
    }}
  >
    Hello
  </div>
