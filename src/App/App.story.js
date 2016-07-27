import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import App from './App'
import { profile } from '../../mocks/profile'
import { components, states, properties } from '../../mocks/components'
import ComponentStateList from '../ComponentStateList'
import Header from '../Header'
import ComponentGrid from '../ComponentGrid'
import SignIn from '../SignIn'
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
  .add('Sign In', () => (
    <SignInScreen />
  ))

const Grid = () => (
  <ComponentGrid
    components={components}
    onClickComponent={action('clicked component')}
  />
)

const GridHeader = ({
  search,
}) => (
  <Header
    profile={profile}
    title='Workflo Components'
    actions={[]}
    search={search}
  />
)

const StateList = () => (
  <ComponentStateList
    states={states}
    onClickState={action('clicked state')}
  />
)

const StateListHeader = ({
  search,
}) => (
  <Header
    profile={profile}
    onClickBack={action('onClickBack')}
    title='Slider'
    subtitle='In focus'
    actions={[]}
    search={search}
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
          header: <GridHeader search={{
            show: true,
            onSearch: this.handleSearch,
            text: search.text,
          }} />,
        }}
        backgroundColor={Colors.steel2}
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
          header: <StateListHeader search={{
            show: true,
            onSearch: this.handleSearch,
            text: search.text,
          }} />,
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
          header: <StateListHeader search={{
            show: true,
            onSearch: this.handleSearch,
            text: search.text,
          }} />,
        }}
      />
    )
  }
}

class SignInScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange ({
    email,
    password,
  }) {
    this.setState({
      email,
      password,
    })
  }

  render () {
    const {
      email,
      password,
    } = this.state
    return (
      <App
        layout={{
          content: (
            <SignIn
              email={email}
              password={password}
              onSignIn={this.handleChange}
            />
          ),
        }}
        backgroundColor={Colors.steel2}
      />
    )
  }
}
