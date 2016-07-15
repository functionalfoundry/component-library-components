import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import App from '.'

storiesOf('App', module)
  .add('Regular', () => (
    <App />
  ))
