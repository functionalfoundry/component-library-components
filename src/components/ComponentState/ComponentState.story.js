import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentState from './ComponentState'
import QuickAction from '../QuickAction'
import {
  Preview,
  PreviewContainer,
} from '@workflo/components'

const MyComponent = ({children}) => (
  <div style={{ backgroundColor: 'magenta', width: 100, height: 100, }}>
    {children}
  </div>
)

const element = (
  <MyComponent>
    <div>Inner Text</div>
  </MyComponent>
)

const actions = [
  <QuickAction
    icon='delete'
    input={{
      type: 'Radio',
      options: [
        'Left',
        'Center',
        'Right',
      ],
      value: 'Center',
    }}
    onChange={action('Alignment')}
  />,
  <QuickAction
    icon='duplicate'
    input={{
      type: 'Radio',
      options: [
        'Small',
        'Base',
        'Large',
      ],
      value: 'Base',
    }}
    onChange={action('Size')}
  />,
]

storiesOf('Component State', module)
  .add('Regular', () => (
    <PreviewContainer>
      <Preview
        label='Regular'
        theme={{
          content: {
            margin: 60,
          },
        }}
      >
        <ComponentState
          harnessCard={{
            actions,
            element,
            harness: {
              componentState: {
                name: 'With title',
              },
              alignment: {
                horizontal: 'Right',
              },
              theme: {
                patterns: {
                  colors: {
                    background: 'yellow',
                  }
                },
              },
            },
            isSelected: false,
          }}
          onClickTitle={action('Click title')}
          onChangeIsSelected={action('Change is selected')}
        />
      </Preview>
    </PreviewContainer>
  ))
