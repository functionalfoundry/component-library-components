import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
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
      layout={{
        content: <List />,
      }}
      navigation={{
        title: 'Workflo Components',
      }}
      backgroundColor={Colors.aluminum6}
    />
  ))
  .add('Component State List', () => (
    <App
      profile={profile}
      layout={{
        content: <StateList />,
      }}
      navigation={{
        title: 'Slider',
        subtitle: 'In focus',
        onClickBack: action('clicked back'),
      }}
    />
  ))
  .add('Live View', () => (
    <App
      profile={profile}
      layout={{
        content: <Live />,
      }}
      navigation={{
        title: 'Slider',
        subtitle: 'In focus',
        onClickBack: action('clicked back'),
      }}
    />
  ))

const List = () => (
  <ComponentList
    components={components}
    onClickComponent={action('clicked component')}
  />
)

const StateList = () => (
  <ComponentStateList
    states={states}
    onClickState={action('clicked state')}
  />
)

const Live = () => (
  <LiveView
    component={components[0]}
    properties={properties}
    profile={profile}
  />
)
