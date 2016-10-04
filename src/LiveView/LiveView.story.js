import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LiveView from './LiveView'
import { components, states, properties } from '../../mocks/components'
import { profile } from '../../mocks/profile'

storiesOf('Live View', module)
  .add('Regular', () => (
    <LiveView
      component={components[0]}
      componentState={states[0]}
      properties={properties}
      profile={profile}
    />
  ))
