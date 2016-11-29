import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Components from '.'
import { components } from '../../../mocks/components'
import { Colors } from '@workflo/styles'

storiesOf('Component Grid', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.aluminum6 }}>
      <Components
        components={components}
      />
    </div>
  ))
