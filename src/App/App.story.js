import React from 'react'
import { storiesOf } from '@kadira/storybook'
import App from './App'
import { profile } from '../../mocks/profile'
import { components, states } from '../../mocks/components'
import ComponentStateList from '../ComponentStateList'
import ComponentList from '../ComponentList'

storiesOf('App', module)
  .add('Component List', () => (
    <App
      profile={profile}
      content={<List />}
    />
  ))
  .add('Component State List', () => (
    <App
      profile={profile}
      content={<StateList />}
    />
  ))

const List = () => (
  <ComponentList
    components={components}
  />
)

const StateList = () => (
  <ComponentStateList
    states={states}
  />
)
