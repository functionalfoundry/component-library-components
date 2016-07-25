import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ComponentGrid from '.'
import { components } from '../../mocks/components'
import { Colors } from '@workflo/styles'

storiesOf('Component Grid', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.aluminum6 }}>
      <ComponentGrid
        components={components}
      />
    </div>
  ))
