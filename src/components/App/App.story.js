import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import App from './App'
import { profile } from '../../../mocks/profile'
import {
  components,
  states,
  componentStates,
  dataCode,
  actionsCode,
} from '../../../mocks/components'
// import ComponentStateList from '../../ComponentStateList'
import Header from '../Header'
// import ComponentGrid from '../../ComponentGrid'
import LiveView from '../LiveView'
import {
  Colors,
} from '@workflo/styles'

storiesOf('App', module)
  .add('Live View', () => (
    <LiveScreen />
  ))

const actions = {
  quickActions: [
    {
      icon: 'add',
      onClick: action('onLike'),
    },
    {
      icon: 'layout',
      onClick: action('onLayout'),
    },
    {
      icon: 'close',
    }
  ],
  secondaryActions: [
    {
      label: 'Cancel',
      onClick: action('onCancel'),
    },
  ],
  primaryAction: {
    label: 'Save',
    onClick: action('onSave'),
  }
}

// const Grid = () => (
//   <ComponentGrid
//     components={components}
//     onClickComponent={action('clicked component')}
//   />
// )
//
// const GridHeader = ({
//   search,
// }) => (
//   <Header
//     {...actions}
//     profile={profile}
//     title='Workflo Components'
//     search={search}
//   />
// )

// const StateList = () => (
//   <ComponentStateList
//     states={states}
//     onClickState={action('clicked state')}
//   />
// )
//
const StateListHeader = ({
  search,
}) => (
  <Header
    {...actions}
    profile={profile}
    onClickBack={action('onClickBack')}
    title='Comment'
    subtitle='with topics'
    search={search}
  />
)

const Live = () => (
  <LiveView
    component={components[0]}
    componentState={componentStates[0]}
    dataCode={dataCode}
    actionsCode={actionsCode}
    onUpdatePropKeyValues={action('onUpdatePropKeyValues')}
    onAddPropToPropKeyValues={action('onAddPropToPropKeyValues')}
    onRemovePropFromPropKeyValues={action('onRemovePropFromPropKeyValues')}
    onChangeData={action('onChangeData')}
    onChangeActions={action('onChangeActions')}
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
            focus: true,
            onSearch: this.handleSearch,
            text: search.text,
            ...actions
          }} />,
        }}
        backgroundColor={Colors.grey200}
      />
    )
  }
}

// class StatesScreen extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       search: {
//         text: null,
//       }
//     }
//     this.handleSearch = this.handleSearch.bind(this)
//   }
//
//   handleSearch (text) {
//     this.setState({
//       search: {
//         text,
//       }
//     })
//   }
//
//   render () {
//     const {
//       search,
//     } = this.state
//     return (
//       <App
//         profile={profile}
//         layout={{
//           content: <StateList />,
//           header: <StateListHeader search={{
//             show: true,
//             onSearch: this.handleSearch,
//             text: search.text,
//           }} />,
//         }}
//       />
//     )
//   }
// }

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
          content: (
            <div style={{ backgroundColor: 'magenta', height: 400 }}>Content</div>
          ),
          header: (
            <div style={{ backgroundColor: 'cyan', height: 100 }}>Header</div>
          ),
        }}
      />
    )
  }
}

// class SignInScreen extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       email: '',
//       password: '',
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }
//
//   handleChange ({
//     email,
//     password,
//   }) {
//     this.setState({
//       email,
//       password,
//     })
//   }
//
//   render () {
//     const {
//       email,
//       password,
//     } = this.state
//     return (
//       <App
//         layout={{
//           content: (
//             <SignIn
//               email={email}
//               password={password}
//               onSignIn={action('Sign in')}
//             />
//           ),
//         }}
//         backgroundColor={Colors.steel2}
//       />
//     )
//   }
// }
