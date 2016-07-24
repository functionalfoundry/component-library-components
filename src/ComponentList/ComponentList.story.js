import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ComponentList from '.'
import { components } from '../../mocks/components'
import { Colors } from '@workflo/styles'

storiesOf('Component List', module)
  .add('Regular', () => (
    <div style={{ backgroundColor: Colors.aluminum6 }}>
      <ComponentList
        components={components}
      />
    </div>
  ))
