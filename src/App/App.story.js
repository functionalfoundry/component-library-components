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
    <ComponentsScreen />
  ))
  .add('Component State List', () => (
    <StatesScreen />
  ))
  .add('Live View', () => (
    <LiveScreen />
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

class ComponentsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: {
        text: null,
      }
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (text) {
    this.setState({
      search: {
        text,
      }
    })
  }

  render () {
    const {
      search,
    } = this.state
    return (
      <App
        profile={profile}
        layout={{
          content: <Grid />,
        }}
        navigation={{
          title: 'Workflo Components',
        }}
        backgroundColor={Colors.aluminum6}
        actions={[]}
        search={{
          show: true,
          onSearch: this.handleSearch,
          text: search.text,
        }}
      />
    )
  }
}

class StatesScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: {
        text: null,
      }
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (text) {
    this.setState({
      search: {
        text,
      }
    })
  }

  render () {
    const {
      search,
    } = this.state
    return (
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
        actions={[]}
        search={{
          show: true,
          onSearch: this.handleSearch,
          text: search.text,
        }}
      />
    )
  }
}

class LiveScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: {
        text: null,
      }
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (text) {
    this.setState({
      search: {
        text,
      }
    })
  }

  render () {
    const {
      search,
    } = this.state
    return (
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
        actions={[]}
        search={{
          show: true,
          onSearch: this.handleSearch,
          text: search.text,
        }}
      />
    )
  }
}
