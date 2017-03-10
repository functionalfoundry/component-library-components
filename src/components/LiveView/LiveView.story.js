import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import LiveView from './LiveView'
import { components, componentStates, dataCode, actionsCode } from '../../../mocks/components'
import {
  Colors,
} from '@workflo/styles'

const component = components[0]
component.element = (
  <div style={{ backgroundColor: 'magenta', height: 30 }}>
    Component
  </div>
)

const properties = {
  children: <div>Child</div>,
}

storiesOf('Live View', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.grey900, }}>
      <LiveView
        component={component}
        componentState={componentStates[0]}
        data={{
          text: dataCode,
        }}
        actions={{
          text: actionsCode
        }}
        harness={{
          alignment: {
            horizontal: 'Center',
            vertical: 'Center',
          },
          theme: {
            patterns: {
              colors: {
                background: 'yellow',
              }
            }
          }
        }}
        onUpdatePropKeyValues={action('onUpdatePropKeyValues')}
        onAddPropToPropKeyValues={action('onAddPropToPropKeyValues')}
        onRemovePropFromPropKeyValues={action('onRemovePropFromPropKeyValues')}
        onChangeData={action('onChangeData')}
        onChangeActions={action('onChangeActions')}
      />
    </div>
  ))
