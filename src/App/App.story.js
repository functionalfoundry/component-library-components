import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import App from './App'
import { profile } from '../../mocks/profile'
import { components, states, properties } from '../../mocks/components'
import ComponentStateList from '../ComponentStateList'
import ComponentGrid from '../ComponentGrid'
import LiveView from '../LiveView'
import {
  Colors,
} from '@workflo/styles'

storiesOf('App', module)
  .add('Component Grid', () => (
    <App
      profile={profile}
      layout={{
        content: <Grid />,
      }}
      navigation={{
        title: 'Workflo Components',
      }}
      backgroundColor={Colors.aluminum6}
      actions={[{
        icon: 'widget-feed',
        onClick: action('clicked widget feed'),
      }]}
      search={{
        show: true,
      }}
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
      actions={[{
        icon: 'widget-feed',
        onClick: action('clicked widget feed'),
      }]}
      search={{
        show: true,
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
      actions={[{
        icon: 'widget-feed',
        onClick: action('clicked widget feed'),
      }]}
    />
  ))

const Grid = () => (
  <ComponentGrid
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
