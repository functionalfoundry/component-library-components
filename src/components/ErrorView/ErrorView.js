import React from 'react'
import Theme from 'js-theme'
import { View } from '@workflo/components'
import { Borders, Colors, Spacing } from '@workflo/styles'

type PropsT = {
    message: string,
    stacktrace: string,
    theme: Object,
};

const defaultProps = {
    message: '',
    stacktrace: '',
}

const ErrorView = ({
    message, stacktrace, theme
} : PropsT) => (
  <View {...theme.errorView}>
    <View {...theme.errorMessage}>
      {message}
    </View>
    <View {...theme.errorStacktrace}>
      {stacktrace}
    </View>
  </View>
)

const defaultTheme = {
  errorView: {
    color: Colors.red400,
    borderWidth: Borders.base,
    borderColor: Colors.red400,
    backgroundColor: 'white',
    padding: Spacing.tiny,
    overflow: 'scroll',
    width: 0,
  },
  errorMessage: {
  },
  errorStacktrace: {
    whiteSpace: 'pre-wrap',
  },
}

const ThemedErrorView = Theme('ErrorView', defaultTheme)(ErrorView)
export default ThemedErrorView