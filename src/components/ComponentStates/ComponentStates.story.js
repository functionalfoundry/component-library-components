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

const actions = [
  <QuickAction
    icon='card-like'
    input={{
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
    icon='card-like-hover'
    input={{
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

const getCard = ({ name, alignment, color, size = 'Base', isSelected = true }) => ({
  actions,
  harness: {
    id: Math.random(),
    componentState: {
      name,
      propMap: {
        children: <div>Inner Text</div>,
      },
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
    isSelected: false,
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
        component={{
          implementation: MockComponent,
        }}
        harnessCards={stateCards}
        onClick={action('onClick')}
        onChange={action('onChange')}
      />
    </div>
  ))
