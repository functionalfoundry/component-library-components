import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Colors } from '@workflo/styles'
import ComponentStateList from '.'

const MockComponent = ({ children }) => (
  <div
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'red',
    }}
  >
    {children}
  </div>
)

const states = [
  {
    id: 23,
    name: 'Regular',
    Component: MockComponent,
    properties: {
      children: <div>Child 1</div>
    },
  },
  {
    id: 24,
    name: 'With Publisher',
    Component: MockComponent,
    properties: {
      children: <div>Child 2</div>
    },
  },
  {
    id: 25,
    name: 'With Attachment',
    Component: MockComponent,
    properties: {
      children: <div>Child 3</div>
    },
  },
]

storiesOf('Component State List', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.steel2 }}>
      <ComponentStateList
        states={states}
      />
    </div>
  ))
