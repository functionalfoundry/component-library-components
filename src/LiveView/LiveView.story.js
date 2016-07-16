import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import LiveView from './LiveView'
import App from 'grommet/components/App'
import Section from 'grommet/components/Section'
import { components, properties } from '../../mocks/components'

storiesOf('Live View', module)
  .add('Regular', () => (
    <LiveView
      component={components[0]}
      properties={properties}
    />
  ))
