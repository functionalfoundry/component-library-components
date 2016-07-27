import React from 'react'
import ReactDOM from 'react-dom'
import {
  Button,
  Heading,
  Icon,
  View,
  TextField,
} from '@workflo/components'
import {
  Colors,
  Fonts,
  Spacing,
} from '@workflo/styles'

type Props = {
  email: String,
  password: String,
  onSignIn: Function,
}

class SignIn extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.refs.email.focus()
  }

  handleChangeEmail (email) {
    this.setState({
      email,
    })
  }

  handleChangePassword (password) {
    this.setState({
      password,
    })
  }

  handleSubmit () {
    this.props.onSignIn(this.state)
  }

  render () {
    const {
      onSignIn,
    } = this.props
    const {
      email,
      password
    } = this.state

    return (
      <View
        style={styles.signIn}
      >
        <View
          style={styles.heroContainer}
        >
          <Icon
            name='logo'
            size='m'
          />
          <Heading
            size={3}
            style={styles.heading}
          >
            Get into the flo
          </Heading>
        </View>
        <View
          style={styles.fields}
        >
          <TextField
            ref='email'
            placeholder='Email'
            value={email}
            theme={{
              input: styles.textField,
            }}
            onChange={this.handleChangeEmail}
          />
          <TextField
            ref='password'
            placeholder='Password'
            value={password}
            type='password'
            theme={{
              input: styles.textField,
            }}
            onChange={this.handleChangePassword}
          />
        </View>
        <View
          style={styles.buttons}
        >
          <Button
            label='Sign In'
            kind='primary'
            shade='dark'
            style={styles.button}
            onClick={this.handleSubmit}
            ghost
          />
        </View>
      </View>
    )
  }
}

const styles = {
  signIn: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    backgroundColor: Colors.steel2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fields: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    padding: Spacing.small,
    width: 400,
  },
  textField: {
    flex: '1',
    backgroundColor: Colors.steel2,
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${Colors.aluminum1}`,
    alignItems: 'center',
    padding: Spacing.tiny,
    ...Fonts.large,
    letterSpacing: '.03em',
    marginBottom: Spacing.base,
  },
  heroContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
  },
  heading: {
    ...Fonts.title,
    ...Fonts.huge,
    fontWeight: 400,
    color: Colors.aluminum5,
    marginTop: 30
  },
  buttons: {
    display: 'flex',
    flex: '0 1 40px',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 400,
  },
  button: {
    fontSize: 30,
  }
}

export default SignIn
