import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import LiveView from './LiveView'
import App from 'grommet/components/App'
import Section from 'grommet/components/Section'

storiesOf('Live View', module)
  .add('Regular', () => (
    <LiveView />
  ))
