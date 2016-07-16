import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Colors } from '@workflo/styles'
import ComponentStateList from '.'
import { states } from '../../mocks/components'

storiesOf('Component State List', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.steel2 }}>
      <ComponentStateList
        states={states}
      />
    </div>
  ))
