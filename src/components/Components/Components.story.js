import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Components from '.'
import { components } from '../../../mocks/components'
import { Colors } from '@workflo/styles'

storiesOf('Components', module).add('Regular', () => (
  <div style={{ backgroundColor: Colors.grey100, padding: 15 }}>
    <Components components={components} />
  </div>
))
