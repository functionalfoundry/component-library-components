/* @flow */
import React from 'react'
import Theme from 'js-theme'
import {
  TextInput,
  View,
} from '@workflo/components'
import {
  Colors,
  Spacing,
} from '@workflo/styles'

type PropsT = {
  configuration: {
    componentsSrcPath: string,
    theme: string,
  },
  onChange: Function,
  theme: Object,
}

const defaultProps = {
  configuration: {
    componentsSrcPath: '',
    theme: '',
  },
}

class Configuration extends React.Component {
  props: PropsT

  constructor(props) {
    super(props)
    this.state = {
      componentsSrcPath: '',
      darkThemeColor: '',
    }
  }

  render() {
    const {
      onChange,
      theme,
      configuration,
      ...props,
    } = this.props
    const {
      componentsSrcPath,
      darkThemeColor,
    } = this.state

    return (
      <View
        {...theme.configuration}
      >
        <TextInput
          value={componentsSrcPath}
          onChange={(value) => this.setState({ componentsSrcPath: value })}
          onBlur={() => onChange({ componentsSrcPath: this.state.componentsSrcPath })}
          placeholder='Components Source Path'
          theme={{
            textInput: {
              borderColor: Colors.primary,
              color: 'white',
              marginBottom: Spacing.small,
            }
          }}
        />
        <TextInput
          value={darkThemeColor}
          onChange={(value) => this.setState({ darkThemeColor: value })}
          onBlur={() => onChange({ darkThemeColor: this.state.darkThemeColor })}
          placeholder='Dark Theme Color'
          theme={{
            textInput: {
              borderColor: Colors.primary,
              color: 'white',
              marginBottom: Spacing.small,
            }
          }}
        />
      </View>
    )
  }
}

Configuration.defaultProps = defaultProps

const defaultTheme = {
  configuration: {
  },
}

export default Theme('Configuration', defaultTheme)(Configuration)
