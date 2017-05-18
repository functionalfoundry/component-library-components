import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Colors } from '@workflo/styles'
import App from './App2'
import Components from '../Components'
import ComponentStates from '../ComponentStates'
import Properties from '../Properties'
import Header from '../Header'
import QuickAction from '../QuickAction'
import LivePreview from '../LivePreview'
import LiveEditor from '../LiveEditor'
import { liveViewState } from '../../../mocks/live-view'
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

storiesOf('App2', module)
  .add('App', () => <AppContainer />)
  .add('Live View (Large height)', () => (
    <App
      sections={{
        header: {
          element: (
            <Header
              title={{
                value: 'Drawer',
              }}
              subtitle={{
                value: 'Collapsed',
              }}
              onClickBack={() => {
                this.setState({
                  screen: 'component states',
                })
              }}
            />
          ),
        },
        centerLeft: {
          element: (
            <LivePreview
              Component={MyComponent}
              propMap={{}}
              alignment={{
                horizontal: 'Center',
                vertical: 'Center',
              }}
              backgroundColor="cyan"
            />
          ),
          layout: {
            height: 700,
          },
        },
        centerRight: {
          element: (
            <LiveEditor
              componentTree={componentTree}
              data={{ text: dataCode }}
              actions={{ text: actionsCode }}
              onChangeData={action('onChangeData')}
              onChangeActions={action('onChangeActions')}
            />
          ),
        },
        bottom: {
          element: <Properties properties={liveViewState.component.properties} />,
        },
      }}
    />
  ))
  .add('Live View (Large width and height)', () => (
    <App
      sections={{
        header: {
          element: (
            <Header
              title={{
                value: 'Drawer',
              }}
              subtitle={{
                value: 'Collapsed',
              }}
              onClickBack={() => {
                this.setState({
                  screen: 'component states',
                })
              }}
            />
          ),
        },
        centerLeft: {
          element: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <LivePreview
                Component={MyComponent}
                propMap={{}}
                alignment={{
                  horizontal: 'Center',
                  vertical: 'Center',
                }}
                backgroundColor="cyan"
              />
              <LiveEditor
                componentTree={componentTree}
                data={{ text: dataCode }}
                actions={{ text: actionsCode }}
                onChangeData={action('onChangeData')}
                onChangeActions={action('onChangeActions')}
                theme={{
                  liveEditor: {
                    flex: '0 1 350px',
                  },
                }}
              />
            </div>
          ),
          layout: {
            height: 700 + 350,
          },
        },
        bottom: {
          element: <Properties properties={liveViewState.component.properties} />,
        },
      }}
    />
  ))

class AppContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      screen: 'components',
      id: null,
    }
  }

  handleClickComponent = id => {
    this.setState({
      screen: 'component states',
      id,
    })
  }

  handleClickState = id => {
    this.setState({
      screen: 'live view',
      id,
    })
  }

  render() {
    const { screen } = this.state
    switch (screen) {
      case 'components':
        return (
          <App
            sections={{
              header: {
                element: (
                  <Header
                    title={{
                      value: 'Components',
                    }}
                    subtitle={{
                      value: 'All',
                    }}
                  />
                ),
              },
              filters: {
                element: <div />,
              },
              centerLeft: {
                element: (
                  <Components
                    components={components}
                    onClickComponent={this.handleClickComponent}
                  />
                ),
              },
            }}
          />
        )
      case 'component states':
        return (
          <App
            sections={{
              header: {
                element: (
                  <Header
                    title={{
                      value: 'Components',
                    }}
                    subtitle={{
                      value: 'All',
                    }}
                    onClickBack={() => {
                      this.setState({
                        screen: 'components',
                      })
                    }}
                  />
                ),
              },
              filters: {
                element: <div />,
              },
              centerLeft: {
                element: (
                  <ComponentStates
                    harnessCards={stateCards}
                    onClick={this.handleClickState}
                    onChange={action('onChange')}
                  />
                ),
              },
            }}
          />
        )
      case 'live view':
        return (
          <App
            sections={{
              header: {
                element: (
                  <Header
                    title={{
                      value: 'Drawer',
                    }}
                    subtitle={{
                      value: 'Collapsed',
                    }}
                    onClickBack={() => {
                      this.setState({
                        screen: 'component states',
                      })
                    }}
                  />
                ),
              },
              centerLeft: {
                element: (
                  <LivePreview
                    Component={MyComponent}
                    propMap={{}}
                    alignment={{
                      horizontal: 'Center',
                      vertical: 'Center',
                    }}
                    backgroundColor="cyan"
                  />
                ),
              },
              centerRight: {
                element: (
                  <LiveEditor
                    componentTree={componentTree}
                    data={{ text: dataCode }}
                    actions={{ text: actionsCode }}
                    onChangeData={action('onChangeData')}
                    onChangeActions={action('onChangeActions')}
                  />
                ),
              },
              bottom: {
                element: <Properties properties={liveViewState.component.properties} />,
              },
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

const actions = [
  <QuickAction
    icon="delete"
    input={{
      type: 'Radio',
      options: ['Left', 'Center', 'Right'],
      value: 'Center',
    }}
    onChange={action('Alignment')}
  />,
  <QuickAction
    icon="duplicate"
    input={{
      type: 'Radio',
      options: ['Small', 'Base', 'Large'],
      value: 'Base',
    }}
    onChange={action('Size')}
  />,
]

const getCard = ({ name, alignment, color, size = 'Base', isSelected = false }) => ({
  actions,
  element,
  harness: {
    id: Math.random().toString(),
    componentState: {
      name,
    },
    alignment: {
      horizontal: alignment,
    },
    size: {
      horizontal: size,
    },
    theme: {
      patterns: {
        colors: {
          background: color,
        },
      },
    },
  },
  isSelected,
  forceShowActions: false,
})

const stateCards = [
  getCard({
    name: 'With title',
    alignment: 'Center',
    color: 'yellow',
  }),
  getCard({
    name: 'Another one',
    alignment: 'Left',
    color: 'cyan',
    isSelected: true,
  }),
  getCard({
    name: 'Full width align left',
    alignment: 'Left',
    color: 'cyan',
    size: 'Large',
  }),
  getCard({
    name: 'Full width align right',
    alignment: 'Right',
    color: 'yellow',
    size: 'Large',
  }),
]

const MockComponent = ({ children }) => (
  <div
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'magenta',
    }}
  >
    {children}
  </div>
)

const element = (
  <MockComponent>
    <div>Inner Text</div>
  </MockComponent>
)
