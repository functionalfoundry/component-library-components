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

const Configuration = ({
  onChange,
  theme,
  configuration,
  ...props,
}: PropsT) => (
  <View
    {...theme.configuration}
  >
    <TextInput
      value={configuration.componentsSrcPath}
      onChange={(value) => onChange({ componentsSrcPath: value })}
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
      value={configuration.theme}
      onChange={(value) => onChange({ theme: value })}
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

Configuration.defaultProps = defaultProps

const defaultTheme = {
  configuration: {
  },
}

export default Theme('Configuration', defaultTheme)(Configuration)
