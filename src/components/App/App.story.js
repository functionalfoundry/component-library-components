import React from 'react'
import { storiesOf } from '@kadira/storybook'
import App from './App'
import { profile } from '../../../mocks/profile'
import { liveViewState } from '../../../mocks/live-view'
import { propKeyValues, dataCode, actionsCode } from '../../../mocks/components'
import Properties from '../Properties'
import Header from '../Header'
import QuickAction from '../QuickAction'
import LivePreview from '../LivePreview'
import LiveEditor from '../LiveEditor'
import {
  Colors,
  Fonts,
} from '@workflo/styles'

storiesOf('App', module)
  .add('LiveView', () => (
    <App
      profile={profile}
      layout={{
        header: (
          <Header
            {...actions}
            profile={profile}
            title={{
              value: 'Drawer',
            }}
            subtitle={{
              value: 'Collapsed',
            }}
            onClickBack={() => {}}
            search={{
              show: true,
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
            componentName='Comment'
            propKeyValues={propKeyValues}
            onChangeCode={() => {}}
            data={{text: dataCode}}
            actions={{text: actionsCode}}
          />
        ),
        bottom: (
          <Properties
            properties={liveViewState.component.properties}
          />
        ),
      }}
    />
  ))
  .add('Header and Content', () => (
    <App
      profile={profile}
      layout={{
        header: (
          <div style={{ backgroundColor: Colors.red600, height: 100 }}>Header</div>
        ),
        content: (
          <div style={{ backgroundColor: Colors.red400, height: 400 }}>Content</div>
        ),
      }}
    />
  ))
  .add('Left and Right Center', () => (
    <App
      profile={profile}
      layout={{
        header: (
          <div style={{ backgroundColor: Colors.red400, height: 100 }}>Header</div>
        ),
        centerLeft: (
          <div style={{ backgroundColor: Colors.red600, height: 400 }}>Left</div>
        ),
        centerRight: (
          <div style={{ backgroundColor: Colors.primary300, height: 400 }}>Right</div>
        ),
        bottom: (
          <div style={{ backgroundColor: Colors.green300, height: 300 }}>Bottom</div>
        ),
      }}
    />
  ))

const actions = {
  quickActions: [
    <QuickAction
      icon='alignment'
      input={{
        type: 'Radio',
        options: [
          'Left',
          'Center',
          'Right',
        ],
        value: 'Center',
      }}
    />,
    <QuickAction
      icon='theme'
      input={{
        type: 'Radio',
        options: [
          'Small',
          'Base',
          'Large',
        ],
        value: 'Base',
      }}
    />,
  ],
}

const MyComponent = () => (
  <div style={{ backgroundColor: 'magenta', height: 50, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', ...Fonts.base }}>
    Hello
  </div>
)
