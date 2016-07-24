import React from 'react'
import { storiesOf } from '@kadira/storybook'
import App from './App'
import { profile } from '../../mocks/profile'
import { states } from '../../mocks/components'

storiesOf('App', module)
  .add('Regular', () => (
    <App
      profile={profile}
      states={states}
    />
  ))
