import React from 'react'
import { storiesOf } from '@kadira/storybook'
import App from './App'
import { profile } from '../../mocks/profile'
import { components, states, properties } from '../../mocks/components'
import ComponentStateList from '../ComponentStateList'
import ComponentList from '../ComponentList'
import LiveView from '../LiveView'
import {
  Colors,
} from '@workflo/styles'

storiesOf('App', module)
  .add('Component List', () => (
    <App
      profile={profile}
      content={<List />}
      backgroundColor={Colors.aluminum6}
    />
  ))
  .add('Component State List', () => (
    <App
      profile={profile}
      content={<StateList />}
    />
  ))
  .add('Live View', () => (
    <App
      profile={profile}
      content={<Live />}
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

const Live = () => (
  <LiveView
    component={components[0]}
    properties={properties}
    profile={profile}
  />
)
