import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {Colors} from '@workflo/styles'
import App from './App2'
import Components from '../Components'
import Properties from '../Properties'
import Header from '../Header'
import QuickAction from '../QuickAction'
import LivePreview from '../LivePreview'
import LiveEditor from '../LiveEditor'
import {liveViewState} from '../../../mocks/live-view'
import {
  componentTree,
  propKeyValues,
  dataCode,
  actionsCode,
  components,
} from '../../../mocks/components'

/**
 * Test Cases
 * 1) Components
 * 2) Component States
 * 3) Live View
 * 4) Short content
 * 5) Large vertical size
 * 6) Small vertical size
 */

storiesOf('App2', module).add('App', () => <AppContainer />)

class AppContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      screen: 'components',
      id: null,
    }
  }

  handleClickComponent = id => {
    this.setState({
      screen: 'live view',
      id,
    })
  };

  render () {
    const {screen} = this.state
    switch (screen) {
      case 'components':
        return (
          <App
            backgroundColor={Colors.grey50}
            layout={{
              header: (
                <Header
                  title={{
                    value: 'Components',
                  }}
                  subtitle={{
                    value: 'All',
                  }}
                />
              ),
              centerLeft: (
                <Components
                  components={components}
                  onClickComponent={this.handleClickComponent}
                />
              ),
            }}
          />
        )
      case 'live view':
        return (
          <App
            layout={{
              header: (
                <Header
                  title={{
                    value: 'Drawer',
                  }}
                  subtitle={{
                    value: 'Collapsed',
                  }}
                  onClickBack={() => {
                    this.setState({
                      screen: 'components',
                    })
                  }}
                />
              ),
              centerLeft: (
                <LivePreview
                  Component={MyComponent}
                  propMap={{}}
                  alignment={{
                    horizontal: 'Center',
                    vertical: 'Center',
                  }}
                  backgroundColor='cyan'
                />
              ),
              centerRight: (
                <LiveEditor
                  componentTree={componentTree}
                  data={{text: dataCode}}
                  actions={{text: actionsCode}}
                  onChangeData={action('onChangeData')}
                  onChangeActions={action('onChangeActions')}
                />
              ),
              bottom: (
                <Properties properties={liveViewState.component.properties} />
              ),
            }}
          />
        )
      default:
        return <div />
    }
  }
}

const MyComponent = () => (
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
)
