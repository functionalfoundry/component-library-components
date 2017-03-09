import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Colors } from '@workflo/styles'
import ComponentStates from './ComponentStates'
import QuickAction from '../QuickAction'

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
        }
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

storiesOf('Component States', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.grey900 }}>
      <ComponentStates
        harnessCards={stateCards}
        onClick={action('onClick')}
        onChange={action('onChange')}
      />
    </div>
  ))
