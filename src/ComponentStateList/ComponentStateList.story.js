import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ComponentStateList from '.'
import { states } from '../../mocks/components'

storiesOf('Component State List', module)
  .add('Regular', () => (
    <ComponentStateList
      states={states}
    />
  ))
