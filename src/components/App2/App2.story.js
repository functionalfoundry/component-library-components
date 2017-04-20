import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import App from './App2'
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
} from '../../../mocks/components'

storiesOf('App2', module).add('LiveView', () => (
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
      bottom: <Properties properties={liveViewState.component.properties} />,
    }}
  />
))

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
